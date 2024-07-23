import { useState, useEffect } from "react";
import { IngredientsByCategory } from "../../types/ingredients/ingredientDTOs";
import { fetchIngredientsByCategories } from "../../services/ingredients/ingredientService";
import IngredientsCatalog from "../Ingredients/IngredientsCatalog";

export default function Recipes() {
  const [ingredientsByCategories, setIngredientsByCategories] = useState<
    IngredientsByCategory[]
  >([]);
  const [loading, setLoading] = useState<boolean>(true);

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

  return (
    <div className="register-bg">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="ingredients-container">
          {ingredientsByCategories.map((x) => (
            <IngredientsCatalog ingredientsByCategory={x} key={x.categoryName} />
          ))}
        </div>
      )}
    </div>
  );
}
