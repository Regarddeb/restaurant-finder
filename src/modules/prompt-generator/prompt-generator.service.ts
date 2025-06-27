import { Injectable } from '@nestjs/common';
import configuration from 'src/config/env.validation';
import axios from 'axios';

const config = configuration();
@Injectable()
export class PromptGeneratorService {
  private LLM_URL = config.llm.baseUrl;
  private readonly INITIAL_PROMPT = `
        You are a natural language interpreter that converts restaurant search queries into JSON for Foursquare Places API.

        STRICT RULES:
        1. ONLY use these exact Foursquare API fields: "query", "near", "ll", "radius", "min_price", "max_price", "open_now", "open_at", "sort", "limit"
        2. DO NOT add any other fields
        3. Price ranges: min_price/max_price must be integers 1-4 (1=cheapest, 4=most expensive)
        4. Location: use "near" for place names OR "ll" for coordinates (latitude,longitude)
        5. Radius: integer 0-100000 (meters)
        6. Sort options: "relevance", "rating", "distance", "popularity"
        7. Limit: integer 1-50 (default 10)
        8. Open timing: use "open_now": true OR "open_at": "1T2130" format (not both)

        Your JSON must look EXACTLY like this:
        {
            "action": "restaurant_search",
            "parameters": {
                "query": "sushi restaurant",
                "near": "downtown Los Angeles",
                "min_price": 1,
                "max_price": 2,
                "open_now": true,
                "sort": "rating",
                "limit": 10
            }
        }

        Examples:
            - "cheap sushi in downtown" → {"action": "restaurant_search", "parameters": {"query": "sushi", "near": "downtown", "min_price": 1, "max_price": 2}}
            - "best Italian restaurants open now" → {"action": "restaurant_search", "parameters": {"query": "Italian restaurant", "open_now": true, "sort": "rating"}}
            - "pizza places within 5km" → {"action": "restaurant_search", "parameters": {"query": "pizza", "radius": 5000}}

        CRITICAL: Only include fields the user mentioned. Extract location to "near" field. Use min_price/max_price for price ranges. Respond with valid JSON only. Remove unnecessary texts.

        This is the user's search query/prompt:
    `;

  execute(message: string) {
    const fullPrompt = `${this.INITIAL_PROMPT}\n${message}"`;
    return this.generateStructuredQuery(fullPrompt);
  }

  async generateStructuredQuery(prompt: string) {
    const response = await axios.post(`${this.LLM_URL}/api/generate`, {
      model: 'llama3.2',
      prompt,
      stream: false,
    });

    const raw = response.data.response;
    return this.extractJson(raw);
  }

  private extractJson(raw: string): any {
    const match = raw.match(/\{[\s\S]*\}/);
    if (!match) {
      throw new Error('No valid JSON found in LLM response');
    }

    try {
      return JSON.parse(match[0]);
    } catch {
      throw new Error('Failed to parse JSON from LLM output');
    }
  }
}
