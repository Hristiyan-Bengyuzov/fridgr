import { Card } from "antd";
import { RecipeDTO } from "../../types/recipes/recipeDTOs";

interface RecipeCardProps {
  recipe: RecipeDTO;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
  return (
    <Card
      hoverable
      style={{ width: 240 }}
      cover={<img alt={recipe.name} src={recipe.image} />}
    >
      <Card.Meta title={recipe.name} />
    </Card>
  );
};

export default RecipeCard;