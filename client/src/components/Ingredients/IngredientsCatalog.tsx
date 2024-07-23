import { IngredientCategoryProps } from "../../types/ingredients/ingredientDTOs";
import { Collapse, Tag } from "antd";
import { useState } from "react";

const { Panel } = Collapse;

export default function IngredientsCatalog({
  ingredientsByCategory,
  onIngredientSelect,
  selectedIngredients,
}: IngredientCategoryProps & {
  onIngredientSelect: (id: number) => void;
  selectedIngredients: number[];
}) {
  const [activeKey, setActiveKey] = useState<string | string[]>([]);

  const handleCollapseChange = (key: string | string[]) => {
    setActiveKey(key);
  };

  return (
    <Collapse
      className="ingredient-panel"
      activeKey={activeKey}
      onChange={handleCollapseChange}
    >
      <Panel
        header={ingredientsByCategory.categoryName}
        key={ingredientsByCategory.categoryName}
      >
        {ingredientsByCategory.ingredients.map((ingredient) => (
          <Tag
            key={ingredient.id}
            className={`ingredient-tag ${
              selectedIngredients.includes(ingredient.id)
                ? "ingredient-tag-selected"
                : ""
            }`}
            onClick={() => onIngredientSelect(ingredient.id)}
          >
            {ingredient.name}
          </Tag>
        ))}
      </Panel>
    </Collapse>
  );
}
