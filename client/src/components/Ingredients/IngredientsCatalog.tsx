import { IngredientCategoryProps } from "../../types/ingredients/ingredientDTOs";
import { Collapse, Tag } from "antd";

const { Panel } = Collapse;

export default function IngredientsCatalog({
  ingredientsByCategory,
}: IngredientCategoryProps) {
  return (
    <Collapse>
      <Panel header={ingredientsByCategory.categoryName} key="1">
        {ingredientsByCategory.ingredients.map((ingredient) => (
          <Tag key={ingredient.id} style={{ margin: "4px" }}>
            {ingredient.name}
          </Tag>
        ))}
      </Panel>
    </Collapse>
  );
}
