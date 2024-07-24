import axios from "axios";
import { RecipeDTO } from "../../types/recipes/recipeDTOs";

export const getRecipesByIngredients = async (ingredients: number[]) => {
    const queryString = ingredients.map(ingredient => `ingredients=${ingredient}`).join('&');
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/Recipes/getRecipes?${queryString}`);
    return response.data as RecipeDTO[];
};
