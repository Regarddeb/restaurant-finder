import { Injectable } from '@nestjs/common';
import configuration from 'src/config/env.validation';
import googleApi from '../../common/utils/googleApi';

const config = configuration();

@Injectable()
export class PromptGeneratorService {

  private readonly INITIAL_PROMPT = `
        You are a natural language interpreter that converts restaurant search queries into JSON for Foursquare Places API.

        STRICT RULES:
        1. ONLY use these exact Foursquare API fields: "query", "near", "ll", "radius", "min_price", "max_price", "open_now", "open_at", "sort", "limit"
        2. DO NOT add any other fields
        3. Price ranges: min_price/max_price must be integers 1-4 (1=cheapest, 4=most expensive)
           - min_price: default value 2
           - max_price: cant be 1 if min is 1; default value is 3
        4. Location: use "near" for place names OR "ll" for coordinates (latitude,longitude)
        5. Radius: integer 0-100000 (meters)
        6. Sort options: "RELEVANCE", "RATING", "DISTANCE", "POPULARITY"
        7. Open timing: use "open_now": true OR "open_at": "1T2130" format (not both)

        Your JSON must look EXACTLY like this:
        {
            "action": "restaurant_search",
            "parameters": {
                "query": "sushi restaurant",
                "near": "downtown Los Angeles",
                "min_price": 1,
                "max_price": 2,
                "open_now": true,
                "open_at": 
                "sort": "RATING",
                "limit": 10
            }
        }

        Examples:
            - "cheap sushi in downtown" → {"action": "restaurant_search", "parameters": {"query": "sushi", "near": "downtown", "min_price": 1, "max_price": 2}}
            - "best Italian restaurants open now" → {"action": "restaurant_search", "parameters": {"query": "Italian restaurant", "open_now": true, "sort": "RATING"}}

        CRITICAL: Only include fields the user mentioned. Extract location to "near" field. Use min_price/max_price for price ranges. Respond with valid JSON only - no markdown code blocks, no explanations, just the raw JSON object.

        This is the user's search query/prompt:
    `;

  execute(message: string) {
    const fullPrompt = `${this.INITIAL_PROMPT}\n${message}`;
    return this.generateStructuredQuery(fullPrompt);
  }

  async generateStructuredQuery(prompt: string) {
    const response = await googleApi(prompt);
    const generatedText = response.data.candidates[0].content.parts[0].text;
    return this.extractJson(generatedText);
  }

  private extractJson(raw: string): any {
    // First, try to extract JSON from markdown code blocks
    const codeBlockMatch = raw.match(/```(?:json)?\s*(\{[\s\S]*?\})\s*```/);
    if (codeBlockMatch) {
      try {
        return JSON.parse(codeBlockMatch[1]);
      } catch {
        throw new Error('Failed to parse JSON from markdown code block');
      }
    }

    // Fallback: try to find raw JSON
    const jsonMatch = raw.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('No valid JSON found in LLM response');
    }

    try {
      return JSON.parse(jsonMatch[0]);
    } catch {
      throw new Error('Failed to parse JSON from LLM output');
    }
  }
}
