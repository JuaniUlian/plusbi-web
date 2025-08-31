'use server';

/**
 * @fileOverview An AI-powered product recommendation wizard for PLUS BI.
 *
 * - getProductRecommendation - A function that takes user input and recommends a PLUS BI product.
 * - ProductRecommendationInput - The input type for the getProductRecommendation function.
 * - ProductRecommendationOutput - The return type for the getProductRecommendation function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ProductRecommendationInputSchema = z.object({
  need: z
    .string()
    .describe('The clients main need'),
});
export type ProductRecommendationInput = z.infer<typeof ProductRecommendationInputSchema>;

const ProductRecommendationOutputSchema = z.object({
  recommendedProduct: z.string().describe('The PLUS BI product recommended for the client.'),
  reason: z.string().describe('The reason for recommending the product, explained in simple, non-technical terms focused on the value for the user.'),
});
export type ProductRecommendationOutput = z.infer<typeof ProductRecommendationOutputSchema>;

export async function getProductRecommendation(input: ProductRecommendationInput): Promise<ProductRecommendationOutput> {
  return productRecommendationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'productRecommendationPrompt',
  input: {schema: ProductRecommendationInputSchema},
  output: {schema: ProductRecommendationOutputSchema},
  prompt: `You are a helpful assistant for PLUS BI. Your goal is to recommend the best product for a potential client based on their needs.
  The available products are:
  - Quest: A Big Data and AI platform to process millions of data points and predict market trends. Ideal for clients who need to analyze large volumes of information to make strategic decisions.
  - Mila: An AI solution for governments that validates legal documents (like decrees or tenders) in minutes, ensuring compliance and preventing errors. Perfect for public sector clients who want to speed up administrative processes.
  - Vuro: An upcoming AI super-agent that automates the entire lifecycle of official documents (creation, review, signing, publication).
  - Sistema de Expediente Electronico: A service to install, support, and train on electronic file systems. Best for organizations looking to digitize their paper-based processes and improve efficiency.

  Based on the client's stated need, recommend ONE of the products. 
  Explain your reasoning in a clear, friendly, and non-technical way. Focus on how the product solves their specific problem and what value it brings to them.

  Client Need: {{{need}}}`,
});

const productRecommendationFlow = ai.defineFlow(
  {
    name: 'productRecommendationFlow',
    inputSchema: ProductRecommendationInputSchema,
    outputSchema: ProductRecommendationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
