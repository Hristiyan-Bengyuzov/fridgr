import axios from "axios";
import {
  CreateRecipeFormValues,
  EditRecipeDTO,
  RecipeDTO,
  RecipeDetailsDTO,
} from "../../types/recipes/recipeDTOs";
import fireSwal from "../../utils/swalUtil";
import Swal from "sweetalert2";

export const getRecipesByIngredients = async (ingredients: number[]) => {
  const queryString = ingredients
    .map((ingredient) => `ingredients=${ingredient}`)
    .join("&");
  const response = await axios.get(
    `${import.meta.env.VITE_API_URL}/api/Recipes/getRecipes?${queryString}`
  );
  return response.data as RecipeDTO[];
};

export const editRecipe = async (
  values: CreateRecipeFormValues,
  recipeData: EditRecipeDTO,
  navigate: any
) => {
  const formData = new FormData();

  formData.append("id", recipeData!.id.toString());
  formData.append("name", values.recipeName);
  recipeData?.ingredientIds.forEach((i) => {
    formData.append("ingredientIds", i.toString());
  });
  values.instructions.forEach((i) => {
    formData.append("instructions", i);
  });
  formData.append("image", recipeData?.image as string);
  if (values.image && values.image[0]) {
    formData.append("imageInput", values.image[0].originFileObj as any);
  }

  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/Recipes/editRecipe`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    fireSwal(
      response.data,
      "You can go back to browsing recipes!",
      "success",
      navigate,
      "/recipes"
    );
  } catch (e) {
    fireSwal("Something went wrong!", "Please try again!", "error", navigate);
  }
};

export const deleteRecipe = async (id: number, navigate: any) => {
  const res = await Swal.fire({
    title: "Are you sure?",
    text: "Once deleted, you will not be able to recover this recipe!",
    icon: "warning",
    color: "white",
    background: "#181a27",
    confirmButtonColor: "#00b96b",
    showCancelButton: true,
  });

  if (res.isConfirmed) {
    const response = await axios.delete(
      `${import.meta.env.VITE_API_URL}/api/Recipes/deleteRecipe/${id}`
    );

    fireSwal(
      "Recipe successfully deleted!",
      "You can go back to browsing recipes!",
      "success",
      navigate,
      "/recipes"
    );
    
    return response.data;
  }
};

export const getRecipeDetails = async (
  recipeId: string
): Promise<RecipeDetailsDTO> => {
  const response = await axios.get<RecipeDetailsDTO>(
    `${import.meta.env.VITE_API_URL}/api/Recipes/getRecipeDetails/${recipeId}`
  );
  return response.data;
};

export const getUsersRecipes = async (
  username: string
): Promise<RecipeDTO[]> => {
  const result = await axios.get<RecipeDTO[]>(
    `${import.meta.env.VITE_API_URL}/api/Recipes/getUsersRecipes/${username}`
  );

  return result.data;
};
