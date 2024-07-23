import { useState, useEffect } from "react";
import { IngredientsByCategory } from "../../types/ingredients/ingredientDTOs";
import { fetchIngredientsByCategories } from "../../services/ingredients/ingredientService";
import IngredientsCatalog from "../Ingredients/IngredientsCatalog";
import '../../assets/styles/Recipes.css';

export default function Recipes() {
  const [ingredientsByCategories, setIngredientsByCategories] = useState<
    IngredientsByCategory[]
  >([]);
  const [selectedIngredients, setSelectedIngredients] = useState<number[]>([]);
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

  const handleIngredientSelect = (id: number) => {
    setSelectedIngredients((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((selectedId) => selectedId !== id)
        : [...prevSelected, id]
    );
  };

  return (
    <div className="recipes-bg">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="ingredients-container">
          {ingredientsByCategories.map((x) => (
            <IngredientsCatalog
              ingredientsByCategory={x}
              key={x.categoryName}
              onIngredientSelect={handleIngredientSelect}
              selectedIngredients={selectedIngredients}
            />
          ))}
        </div>
      )}
    </div>
  );
}
