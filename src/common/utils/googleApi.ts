import axios from 'axios';
import configuration from 'src/config/env.validation';

const config = configuration();

const googleApi = (prompt: string) => {
  try {
    const response = axios.post(
      `${config.googleAI.googleApiUrl}?key=${config.googleAI.googleApiKey}`,
      {
        contents: [
          {
            parts: [{ text: prompt }],
          },
        ],
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    return response;
  } catch (error) {
    const message = error.response?.data || error.message;
    console.error('Google API Error:', message);
    throw new Error('Google API request failed');
  }
};

export default googleApi;
