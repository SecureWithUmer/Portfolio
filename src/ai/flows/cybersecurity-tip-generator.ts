// This is a server-side file.
'use server';

/**
 * @fileOverview Generates a Cybersecurity Tip of the Week, tailored to a user profile, offering practical advice and occasionally including a simulated code snippet.
 *
 * - generateCybersecurityTip - A function that generates the cybersecurity tip.
 * - CybersecurityTipInput - The input type for the generateCybersecurityTip function.
 * - CybersecurityTipOutput - The return type for the generateCybersecurityTip function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CybersecurityTipInputSchema = z.object({
  userProfile: z
    .string()
    .describe('A description of the user profile and their cybersecurity knowledge.'),
});
export type CybersecurityTipInput = z.infer<typeof CybersecurityTipInputSchema>;

const CybersecurityTipOutputSchema = z.object({
  tip: z.string().describe('The cybersecurity tip of the week.'),
  codeSnippet: z.string().optional().describe('An optional code snippet to illustrate the tip.'),
});
export type CybersecurityTipOutput = z.infer<typeof CybersecurityTipOutputSchema>;

export async function generateCybersecurityTip(input: CybersecurityTipInput): Promise<CybersecurityTipOutput> {
  return generateCybersecurityTipFlow(input);
}

const prompt = ai.definePrompt({
  name: 'cybersecurityTipPrompt',
  input: {schema: CybersecurityTipInputSchema},
  output: {schema: CybersecurityTipOutputSchema},
  prompt: `You are an expert cybersecurity advisor providing a helpful cybersecurity tip of the week tailored to the user's profile.  Sometimes include a brief, simulated code snippet to illustrate the tip when relevant.  The user profile is: {{{userProfile}}}.`,
});

const generateCybersecurityTipFlow = ai.defineFlow(
  {
    name: 'generateCybersecurityTipFlow',
    inputSchema: CybersecurityTipInputSchema,
    outputSchema: CybersecurityTipOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
