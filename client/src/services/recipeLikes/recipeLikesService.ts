import axios from "axios";
import { RecipeLikeRequest } from "../../types/recipeLikes/recipeLikesDTOs";

export const likeRecipe = async (recipeLikeRequest: RecipeLikeRequest) => {
  await axios.post(
    `${import.meta.env.VITE_API_URL}/api/RecipeLikes/likeRecipe`,
    recipeLikeRequest
  );
};
