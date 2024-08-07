import { Card, Button } from "antd";
import { RecipeDTO } from "../../types/recipes/recipeDTOs";
import { useNavigate } from "react-router-dom";

interface RecipeCardProps {
  recipe: RecipeDTO;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
  const navigate = useNavigate();

  const goToRecipe = () => {
    navigate(`/recipe/${recipe.id}`);
  };

  return (
    <Card
      className="dark-bg no-border"
      hoverable
      style={{ width: 240 }}
      cover={<img alt={recipe.name} src={recipe.image} height={"175px"} />}
    >
      <Card.Meta title={recipe.name} />
      <Button type="primary" onClick={goToRecipe} style={{ marginTop: 16 }}>
        View Recipe
      </Button>
    </Card>
  );
};

export default RecipeCard;
