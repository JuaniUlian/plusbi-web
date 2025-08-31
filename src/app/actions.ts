"use server";

import { getProductRecommendation, type ProductRecommendationInput } from "@/ai/flows/product-recommendation-wizard";

export async function recommendProduct(input: ProductRecommendationInput) {
    try {
        const result = await getProductRecommendation(input);
        return { success: true, data: result };
    } catch (error) {
        console.error("Error getting product recommendation:", error);
        return { success: false, error: "Failed to get recommendation." };
    }
}
