import axios from "axios";
import { IngredientsByCategory } from "../../types/ingredients/ingredientDTOs";

export const fetchIngredientsByCategories = async () => {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/Ingredients/getIngredients`);
    return response.data as IngredientsByCategory[];
};