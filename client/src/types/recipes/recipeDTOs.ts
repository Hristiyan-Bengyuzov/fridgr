import { UploadFile } from "antd";

export interface RecipeDTO {
  id: number;
  name: string;
  image: string;
}

export interface CreateRecipeFormValues {
  recipeName: string;
  instructions: string[];
  image?: UploadFile[];
}

export interface RecipeDetailsDTO {
  id: number;
  name: string;
  image: string;
  owner?: string | null;
  ingredients: string[];
  instructions: string[];
}

export interface EditRecipeDTO {
  id: number;
  name: string;
  image: string;
  imageInput: UploadFile[];
  ingredientIds: number[];
  instructions: string[];
}
