import axios from "axios";
import { RecipeLikeRequest } from "../../types/recipeLikes/recipeLikesDTOs";
import { RecipeDTO } from "../../types/recipes/recipeDTOs";

export const likeRecipe = async (recipeLikeRequest: RecipeLikeRequest) => {
  await axios.post(
    `${import.meta.env.VITE_API_URL}/api/RecipeLikes/likeRecipe`,
    recipeLikeRequest
  );
};

export const getUsersLikedRecipes = async (
  username: string
): Promise<RecipeDTO[]> => {
  const result = await axios.get<RecipeDTO[]>(
    `${
      import.meta.env.VITE_API_URL
    }/api/RecipeLikes/getLikedRecipes/${username}`
  );

  return result.data;
};
