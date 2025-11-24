
import { genkit } from 'genkit';
import { googleAI } from '@genkit-ai/google-genai';

// Note: These files are read from the environment automatically
// by the genkit googleAI plugin.
// GOOGLE_API_KEY
// GOOGLE_APPLICATION_CREDENTIALS

export const ai = genkit({
  plugins: [googleAI()],
});
