import { useEffect } from "react";
import { Card, List, Typography } from "antd";
import { RecipeDetailsDTO } from "../../types/recipes/recipeDTOs";
import { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const { Title } = Typography;

export default function RecipeDetails() {
  const [recipeDetails, setRecipeDetails] = useState<RecipeDetailsDTO>(
    {} as RecipeDetailsDTO
  );
  const { recipeId } = useParams();

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      const response = await axios.get(
        `${
          import.meta.env.VITE_API_URL
        }/api/Recipes/getRecipeDetails/${recipeId}`
      );
      setRecipeDetails(response.data);
    };

    fetchRecipeDetails();
  }, [recipeId]);

  return (
    <div className="recipe-details-container">
      <Card
        hoverable
        className="recipe-details-card"
        style={{ }}
        cover={<img alt={recipeDetails.name} src={recipeDetails.image} className="img-fluid recipe-details-img"/>}
      >
        <Title level={2}>{recipeDetails.name}</Title>
        <Title level={3}>Ingredients</Title>
        <List
          dataSource={recipeDetails.ingredients}
          renderItem={(ingredient) => <List.Item>{ingredient}</List.Item>}
          bordered
        />
        <Title level={3} style={{ marginTop: "16px" }}>
          Instructions
        </Title>
        <List
          dataSource={recipeDetails.instructions}
          renderItem={(instruction, index) => (
            <List.Item>
              <Typography.Text>{`${
                index + 1
              }. ${instruction}`}</Typography.Text>
            </List.Item>
          )}
          bordered
        />
      </Card>
    </div>
  );
}
