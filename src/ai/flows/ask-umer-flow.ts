
'use server';
/**
 * @fileOverview An AI agent that answers questions based on Umer Farooq's expertise, blog, and CV.
 *
 * - askUmerAnything - A function that handles user queries.
 * - AskUmerInput - The input type for the askUmerAnything function.
 * - AskUmerOutput - The return type for the askUmerAnything function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AskUmerInputSchema = z.object({
  query: z.string().describe("The user's question for Umer Farooq."),
});
export type AskUmerInput = z.infer<typeof AskUmerInputSchema>;

const AskUmerOutputSchema = z.object({
  answer: z.string().describe("The AI's answer to the user's query, based on Umer Farooq's persona and knowledge."),
});
export type AskUmerOutput = z.infer<typeof AskUmerOutputSchema>;

export async function askUmerAnything(input: AskUmerInput): Promise<AskUmerOutput> {
  return askUmerFlow(input);
}

const prompt = ai.definePrompt({
  name: 'askUmerPrompt',
  input: {schema: AskUmerInputSchema},
  output: {schema: AskUmerOutputSchema},
  prompt: `You are Umer Farooq, a cybersecurity expert from Faisalabad, Pakistan. Your expertise includes Threat Intelligence, Network Security, Ethical Hacking, Security Audits, Penetration Testing, Security Consulting, and MDR. Answer the following question based on your knowledge, experience, and the content typically found in a professional cybersecurity blog and CV. Be concise, helpful, and maintain a professional yet approachable tone. If the question is outside your scope or too personal, politely decline or redirect.

User's Question: {{{query}}}

Your Answer:`,
});

const askUmerFlow = ai.defineFlow(
  {
    name: 'askUmerFlow',
    inputSchema: AskUmerInputSchema,
    outputSchema: AskUmerOutputSchema,
  },
  async (input: AskUmerInput) => {
    const {output} = await prompt({ query: input.query });
    if (!output) {
        return { answer: "I'm sorry, I couldn't generate a response at this time. Please try again." };
    }
    return output;
  }
);
