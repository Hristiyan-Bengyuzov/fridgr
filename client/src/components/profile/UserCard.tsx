import { useEffect } from "react";
import { UserDetailsDTO } from "../../types/users/userDTOs";
import { Card, Avatar, Statistic, Row, Col, Segmented } from "antd";
import { HeartOutlined, CoffeeOutlined, StarOutlined } from "@ant-design/icons";
import { RecipeDTO } from "../../types/recipes/recipeDTOs";
import { UsersReviewsDTO } from "../../types/reviews/reviewDTOs";
import { getUsersRecipes } from "../../services/recipes/recipeService";
import { getUsersLikedRecipes } from "../../services/recipeLikes/recipeLikesService";
import { getUsersReviews } from "../../services/reviews/reviewService";

interface UserCardProps {
  userDetails: UserDetailsDTO;
  segment: string | null;
  setSegment: React.Dispatch<React.SetStateAction<string | null>>;
  setRecipes: React.Dispatch<React.SetStateAction<RecipeDTO[]>>;
  setLikedRecipes: React.Dispatch<React.SetStateAction<RecipeDTO[]>>;
  setReviews: React.Dispatch<React.SetStateAction<UsersReviewsDTO[]>>;
}

export default function UserCard({
  userDetails,
  segment,
  setSegment,
  setRecipes,
  setLikedRecipes,
  setReviews,
}: UserCardProps) {
  const fetchRecipes = async () => {
    try {
      setRecipes(await getUsersRecipes(userDetails.username));
    } catch (error) {
      console.error("Error fetching recipes: ", error);
    }
  };

  const fetchLikedRecipes = async () => {
    try {
      setLikedRecipes(await getUsersLikedRecipes(userDetails.username));
    } catch (error) {
      console.error("Error fetching liked recipes: ", error);
    }
  };

  const fetchReviews = async () => {
    try {
      setReviews(await getUsersReviews(userDetails.username));
    } catch (error) {
      console.error("Error fetching reviews: ", error);
    }
  };

  useEffect(() => {
    switch (segment) {
      case "liked":
        fetchLikedRecipes();
        break;
      case "recipes":
        fetchRecipes();
        break;
      case "reviews":
        fetchReviews();
        break;
    }
  }, [segment]);

  return (
    <Card className="dark-bg no-border" style={{ textAlign: "center" }}>
      <div className="user-avatar-container">
        <Avatar
          src={userDetails.image}
          size={128}
          style={{ marginRight: 16 }}
        />
        <h2 className="white-text" style={{ fontSize: "2em" }}>
          {userDetails.username}
        </h2>
      </div>
      <Row gutter={16} style={{ marginTop: 32 }}>
        <Col span={8}>
          <Statistic
            title={
              <span className="white-text" style={{ fontSize: "1.5em" }}>
                Liked Recipes
              </span>
            }
            value={userDetails.likedRecipesCount}
            valueStyle={{ fontSize: "2em" }}
          />
        </Col>
        <Col span={8}>
          <Statistic
            title={
              <span className="white-text" style={{ fontSize: "1.5em" }}>
                Reviews
              </span>
            }
            value={userDetails.reviewsCount}
            valueStyle={{ fontSize: "2em" }}
          />
        </Col>
        <Col span={8}>
          <Statistic
            title={
              <span className="white-text" style={{ fontSize: "1.5em" }}>
                Recipes
              </span>
            }
            value={userDetails.recipesCount}
            valueStyle={{ fontSize: "2em" }}
          />
        </Col>
      </Row>
      <Segmented
        className="dark-bg white-text"
        style={{ marginTop: 32 }}
        options={[
          {
            label: (
              <span className="segment">
                <HeartOutlined />
                Liked Recipes
              </span>
            ),
            value: "liked",
          },
          {
            label: (
              <span className="segment">
                <CoffeeOutlined />
                My Recipes
              </span>
            ),
            value: "recipes",
          },
          {
            label: (
              <span className="segment">
                <StarOutlined />
                My Reviews
              </span>
            ),
            value: "reviews",
          },
        ]}
        value={segment}
        onChange={(value) => setSegment(value)}
      />
    </Card>
  );
}
