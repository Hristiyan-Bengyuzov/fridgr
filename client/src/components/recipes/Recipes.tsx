import { useState, useEffect } from "react";
import { IngredientsByCategory } from "../../types/ingredients/ingredientDTOs";
import { fetchIngredientsByCategories } from "../../services/ingredients/ingredientService";
import IngredientsCatalog from "../Ingredients/IngredientsCatalog";
import { Button } from "antd";
import "../../assets/styles/Recipes.css";
import { getRecipesByIngredients } from "../../services/recipes/recipeService";
import RecipeCard from "./RecipeCard";
import { RecipeDTO } from "../../types/recipes/recipeDTOs";
import { useNavigate } from "react-router-dom";

export default function Recipes() {
  const [ingredientsByCategories, setIngredientsByCategories] = useState<
    IngredientsByCategory[]
  >([]);
  const [selectedIngredients, setSelectedIngredients] = useState<number[]>([]);
  const [recipes, setRecipes] = useState<RecipeDTO[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchIngredientsByCategories();
        setIngredientsByCategories(result);
      } catch (error) {
        console.error("Error fetching ingredients:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleIngredientSelect = (id: number) => {
    setSelectedIngredients((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((selectedId) => selectedId !== id)
        : [...prevSelected, id]
    );
  };

  const fetchRecipes = async (ingredients: number[]) => {
    const result = await getRecipesByIngredients(ingredients);
    setRecipes(result);
  };

  return (
    <div className="recipes-bg">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className="ingredients-container">
            {ingredientsByCategories.map((x) => (
              <IngredientsCatalog
                ingredientsByCategory={x}
                key={x.categoryName}
                onIngredientSelect={handleIngredientSelect}
                selectedIngredients={selectedIngredients}
              />
            ))}
            <Button
              className="recipes-btn"
              onClick={() => fetchRecipes(selectedIngredients)}
            >
              Search recipes
            </Button>
          </div>
          <div className="recipes-container">
            {recipes.length > 0 ? (
              recipes.map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))
            ) : (
              <div style={{ marginLeft: 70 }}>
                <p className="white-text">
                  No recipes with selected ingredients? Create one.
                </p>
                <Button onClick={() => navigate("/createRecipe")}>
                  Create Recipe
                </Button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
