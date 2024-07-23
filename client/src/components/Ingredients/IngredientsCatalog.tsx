import { IngredientCategoryProps } from "../../types/ingredients/ingredientDTOs";
import { Collapse, Tag } from "antd";

const { Panel } = Collapse;

export default function IngredientsCatalog({
  ingredientsByCategory,
  onIngredientSelect,
  selectedIngredients,
}: IngredientCategoryProps & {
  onIngredientSelect: (id: number) => void;
  selectedIngredients: number[];
}) {
  return (
    <Collapse>
      <Panel
        header={ingredientsByCategory.categoryName}
        key={ingredientsByCategory.categoryName}
      >
        {ingredientsByCategory.ingredients.map((ingredient) => (
          <Tag
            key={ingredient.id}
            style={{
              margin: "4px",
              backgroundColor: selectedIngredients.includes(ingredient.id)
                ? "#1890ff"
                : "",
              color: selectedIngredients.includes(ingredient.id) ? "white" : "",
              cursor: "pointer",
              userSelect: "none",
            }}
            onClick={() => onIngredientSelect(ingredient.id)}
          >
            {ingredient.name}
          </Tag>
        ))}
      </Panel>
    </Collapse>
  );
}
