export interface IngredientsByCategory {
    categoryName: string;
    ingredients:  Ingredient[];
}

export interface Ingredient {
    id:   number;
    name: string;
}

export interface IngredientCategoryProps {
    ingredientsByCategory: IngredientsByCategory;
}