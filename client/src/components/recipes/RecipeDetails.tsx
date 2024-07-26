import { useContext, useEffect } from "react";
import { Card, List, Typography, Button } from "antd";
import { HeartOutlined, HeartFilled } from "@ant-design/icons";
import { RecipeDetailsDTO } from "../../types/recipes/recipeDTOs";
import { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../contexts/AuthContext";
import { likeRecipe } from "../../services/recipeLikes/recipeLikesService";
import '../../assets/styles/Heart.css';

const { Title } = Typography;

export default function RecipeDetails() {
  const [recipeDetails, setRecipeDetails] = useState<RecipeDetailsDTO>(
    {} as RecipeDetailsDTO
  );
  const [liked, setLiked] = useState<boolean>(false);
  const { recipeId } = useParams();
  const authContext = useContext(AuthContext);

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

  const toggleLike = async (recipeId: number, username: string) => {
    setLiked(!liked);
    await likeRecipe({ recipeId: recipeId, username: username });
  };

  return (
    <div className="recipe-details-container">
      <Card
        hoverable
        className="recipe-details-card"
        cover={
          <img
            alt={recipeDetails.name}
            src={recipeDetails.image}
            className="img-fluid recipe-details-img"
          />
        }
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
        <Button
          type="primary"
          icon={liked ? <HeartFilled className="heart-icon liked" /> : <HeartOutlined className="heart-icon" />}
          onClick={() =>
            toggleLike(
              parseInt(recipeId as string),
              authContext?.user?.username as string
            )
          }
          style={{ marginTop: "16px" }}
        >
          {liked ? "Remove Like" : "Like Recipe"}
        </Button>
      </Card>
    </div>
  );
}
