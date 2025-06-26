import { z } from 'zod';
import { config as dotenvConfig } from 'dotenv'

dotenvConfig()

// validate env variables on load
const configSchema = z.object({
  APP_URL: z.string().url(),
  APP_PORT: z.string().regex(/^\d+$/).transform(Number).default('3000'),
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
  AUTH_CODE: z.string().default('pioneerdevai'),

  // four square space
  FSS_API_KEY: z.string(),
  FSS_BASE_URL: z.string().url(),

  // llm used for development(ollama)
  LLM_BASE_URL: z.string().url().optional().or(z.literal('')),
  LLM_API_KEY: z.string().optional().or(z.literal('')),

  // llm used in production
  LLM_PROD_URL: z.string().url().optional().or(z.literal('')),
  LLM_PROD_API_KEY: z.string().optional().or(z.literal('')),
});

const config = configSchema.parse(process.env);

const configuration = () => ({
  app: {
    url: config.APP_URL,
    port: config.APP_PORT,
    environment: config.NODE_ENV,
  },
  auth: {
    authCode: config.AUTH_CODE
  },
  foursquare: {
    apiKey: config.FSS_API_KEY,
    baseUrl: config.FSS_BASE_URL,
  },
  llm: {
    baseUrl: config.LLM_BASE_URL,
  },
  llmProd: {
    prodUrl: config.LLM_PROD_URL,
    prodApiKey: config.LLM_PROD_API_KEY,
  },
});

type Config = ReturnType<typeof configuration>;
export {
  Config,
  configSchema
}
export default configuration;
