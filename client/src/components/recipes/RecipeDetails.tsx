import { useContext, useEffect, useState } from "react";
import { Card, List, Typography, Button, Modal, Spin } from "antd";
import {
  HeartOutlined,
  HeartFilled,
  EditOutlined,
  DeleteOutlined,
  StarOutlined,
} from "@ant-design/icons";
import { RecipeDetailsDTO } from "../../types/recipes/recipeDTOs";
import { ReviewDTO } from "../../types/reviews/reviewDTOs";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import {
  getIsRecipeLiked,
  likeRecipe,
} from "../../services/recipeLikes/recipeLikesService";
import {
  deleteRecipe,
  getRecipeDetails,
} from "../../services/recipes/recipeService";
import { getReviews } from "../../services/reviews/reviewService";
import { useNavigate } from "react-router-dom";
import ReviewForm from "../reviews/ReviewForm";
import ReviewList from "../reviews/ReviewList";
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
  const [reviews, setReviews] = useState<ReviewDTO[]>([]);
  const [totalReviews, setTotalReviews] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);

  // load initial recipe data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setRecipeDetails(await getRecipeDetails(recipeId as string));
      } catch (error) {
        console.error("Failed to fetch recipe details:", error);
      }
    };

    fetchData();
  }, [recipeId]);

  // load if recipe is liked when user loads
  useEffect(() => {
    const fetchIsLiked = async () => {
      try {
        setLiked(
          await getIsRecipeLiked({
            recipeId: parseInt(recipeId as string),
            username: authContext?.user?.username as string,
          })
        );
      } catch (error) {
        console.error("Failed to fetch recipe details:", error);
      }
    };

    fetchIsLiked();
  }, [recipeId, authContext?.user?.username]);

  // load reviews on page change
  useEffect(() => {
    const fetchReviewData = async () => {
      setLoading(true);
      try {
        const reviewData = await getReviews(recipeId as string, currentPage);
        setReviews(reviewData.reviews);
        setTotalReviews(reviewData.totalReviews);
      } catch (error) {
        console.error("Failed to fetch reviews:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviewData();
  }, [recipeId, currentPage]);

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

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="recipe-details-container">
      <Card
        hoverable
        className="recipe-details-card dark-bg no-border"
        cover={
          <img
            alt={recipeDetails.name}
            src={recipeDetails.image}
            className="img-fluid recipe-details-img"
          />
        }
      >
        <Title className="white-text" level={2}>
          {recipeDetails.name}
        </Title>
        <Title className="white-text" level={3}>
          Ingredients
        </Title>
        <List
          dataSource={recipeDetails.ingredients}
          renderItem={(ingredient) => (
            <List.Item className="white-text">{ingredient}</List.Item>
          )}
          bordered
        />
        <Title className="white-text" level={3} style={{ marginTop: "16px" }}>
          Instructions
        </Title>
        <List
          dataSource={recipeDetails.instructions}
          renderItem={(instruction, index) => (
            <List.Item>
              <Typography.Text className="white-text">{`${
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
        <ReviewForm
          recipeId={recipeId as string}
          setIsModalVisible={setIsModalVisible}
          setReviews={setReviews}
          setTotalReviews={setTotalReviews}
          requestType="create"
        />
      </Modal>
      {loading ? (
        <Spin size="large" />
      ) : (
        <ReviewList
          reviews={reviews}
          totalReviews={totalReviews}
          currentPage={currentPage}
          handlePageChange={handlePageChange}
        />
      )}
    </div>
  );
}
