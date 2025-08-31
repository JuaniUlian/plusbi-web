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
  reason: z.string().describe('The reason for recommending the product.'),
});
export type ProductRecommendationOutput = z.infer<typeof ProductRecommendationOutputSchema>;

export async function getProductRecommendation(input: ProductRecommendationInput): Promise<ProductRecommendationOutput> {
  return productRecommendationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'productRecommendationPrompt',
  input: {schema: ProductRecommendationInputSchema},
  output: {schema: ProductRecommendationOutputSchema},
  prompt: `Based on the client's stated need, recommend one of the following PLUS BI products: Quest, Mila, Vuro, or Sistema de Expediente Electronico. Explain your reasoning.\n\nClient Need: {{{need}}}`,
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
