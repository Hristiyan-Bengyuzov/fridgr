import React, { useContext, useEffect, useState } from "react";
import { Card, List, Typography, Button, Modal } from "antd";
import {
  HeartOutlined,
  HeartFilled,
  EditOutlined,
  DeleteOutlined,
  StarOutlined,
} from "@ant-design/icons";
import { RecipeDetailsDTO } from "../../types/recipes/recipeDTOs";
import { useParams } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../contexts/AuthContext";
import { likeRecipe } from "../../services/recipeLikes/recipeLikesService";
import { deleteRecipe } from "../../services/recipes/recipeService";
import { useNavigate } from "react-router-dom";
import ReviewForm from "../reviews/ReviewForm";
import "../../assets/styles/Heart.css";

const { Title } = Typography;

export default function RecipeDetails() {
  const [recipeDetails, setRecipeDetails] = useState<RecipeDetailsDTO>(
    {} as RecipeDetailsDTO
  );
  const [liked, setLiked] = useState<boolean>(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { recipeId } = useParams();
  const navigate = useNavigate();
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

  const handleEdit = () => {
    navigate(`/editRecipe/${recipeId}`);
  };

  const handleDelete = async () => {
    await deleteRecipe(recipeDetails.id, navigate);
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
        <div className="button-container" style={{ marginTop: "16px" }}>
          {authContext?.user ? (
            recipeDetails.owner === authContext?.user?.username ? (
              <>
                <Button
                  className="recipe-details-btn"
                  icon={<EditOutlined />}
                  onClick={handleEdit}
                  style={{ backgroundColor: "yellow", borderColor: "yellow" }}
                >
                  Edit Recipe
                </Button>
                <Button
                  className="recipe-details-btn"
                  icon={<DeleteOutlined />}
                  onClick={handleDelete}
                  style={{
                    backgroundColor: "red",
                    borderColor: "red",
                    marginLeft: "8px",
                  }}
                >
                  Delete Recipe
                </Button>
              </>
            ) : (
              <>
                <Button
                  type="primary"
                  icon={
                    liked ? (
                      <HeartFilled className="heart-icon liked" />
                    ) : (
                      <HeartOutlined className="heart-icon" />
                    )
                  }
                  onClick={() =>
                    toggleLike(
                      parseInt(recipeId as string),
                      authContext?.user?.username as string
                    )
                  }
                >
                  {liked ? "Remove Like" : "Like Recipe"}
                </Button>
                <Button
                  icon={<StarOutlined />}
                  type="primary"
                  onClick={() => setIsModalVisible(true)}
                  style={{ marginLeft: "8px" }}
                >
                  Write a Review
                </Button>
              </>
            )
          ) : (
            <Typography.Text>
              You need to be logged in to perform actions
            </Typography.Text>
          )}
        </div>
      </Card>
      <Modal
        title="Write a Review"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <ReviewForm recipeId={recipeId} setIsModalVisible={setIsModalVisible} />
      </Modal>
    </div>
  );
}
