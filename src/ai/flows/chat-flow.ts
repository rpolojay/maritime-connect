'use server';
/**
 * @fileOverview A simple chatbot flow for user inquiries.
 *
 * - chat - A function that takes a user message and returns an AI-generated response.
 * - ChatInput - The input type for the chat function.
 * - ChatOutput - The return type for the chat function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const ChatInputSchema = z.object({
  message: z.string().describe('The user\'s message to the chatbot.'),
});
export type ChatInput = z.infer<typeof ChatInputSchema>;

const ChatOutputSchema = z.object({
  response: z.string().describe('The AI-generated response to the user\'s message.'),
});
export type ChatOutput = z.infer<typeof ChatOutputSchema>;

export async function chat(input: ChatInput): Promise<ChatOutput> {
  return chatFlow(input);
}

const prompt = ai.definePrompt({
  name: 'chatPrompt',
  input: { schema: ChatInputSchema },
  output: { schema: ChatOutputSchema },
  prompt: `
    You are a friendly and helpful AI assistant for Selective Crew, a maritime recruitment agency.
    Your goal is to answer user questions about finding jobs on cruise ships, C1/D visas, resume building, and general inquiries about the company.
    Keep your answers concise, helpful, and professional.

    User's question: {{{message}}}
  `,
});

const chatFlow = ai.defineFlow(
  {
    name: 'chatFlow',
    inputSchema: ChatInputSchema,
    outputSchema: ChatOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);

    if (!output?.response) {
      return { response: "I'm sorry, I couldn't generate a response at the moment. Please try asking in a different way." };
    }
    
    return output;
  }
);
