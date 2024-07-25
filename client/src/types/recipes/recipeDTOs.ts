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
