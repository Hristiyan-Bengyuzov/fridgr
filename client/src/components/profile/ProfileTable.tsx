import { Table, Space, Button, Modal } from "antd";
import { ColumnsType } from "antd/lib/table";
import { RecipeDTO } from "../../types/recipes/recipeDTOs";
import { UsersReviewsDTO } from "../../types/reviews/reviewDTOs";
import { useNavigate } from "react-router-dom";
import { deleteRecipe } from "../../services/recipes/recipeService";
import { UserDetailsDTO } from "../../types/users/userDTOs";
import { deleteReview } from "../../services/reviews/reviewService";
import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import ReviewForm from "../reviews/ReviewForm";

interface DataTableProps {
  userDetails: UserDetailsDTO;
  segment: string;
  recipes: RecipeDTO[];
  likedRecipes: RecipeDTO[];
  reviews: UsersReviewsDTO[];
  setReviews: any;
}

export default function ProfileTable({
  userDetails,
  segment,
  recipes,
  likedRecipes,
  reviews,
  setReviews,
}: DataTableProps) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  const columns: { [key: string]: ColumnsType<any> } = {
    liked: [
      { title: "Recipe Name", dataIndex: "name", key: "name" },
      {
        title: "Image",
        dataIndex: "image",
        key: "image",
        render: (url: string) => (
          <img src={url} alt="recipe" style={{ width: 100 }} />
        ),
      },
      {
        title: "Actions",
        key: "actions",
        render: (text, record) => (
          <Space size="middle">
            <Button onClick={() => navigate(`/recipe/${record.id}`)}>
              View
            </Button>
          </Space>
        ),
      },
    ],
    recipes: [
      { title: "Recipe Name", dataIndex: "name", key: "name" },
      {
        title: "Image",
        dataIndex: "image",
        key: "image",
        render: (url: string) => (
          <img src={url} alt="recipe" style={{ width: 100 }} />
        ),
      },
      {
        title: "Actions",
        key: "actions",
        render: (text, record) => (
          <Space size="middle">
            <Button onClick={() => navigate(`/recipe/${record.id}`)}>
              View
            </Button>
            {authContext?.user?.username === userDetails.username && (
              <>
                <Button onClick={() => navigate(`/editRecipe/${record.id}`)}>
                  Edit
                </Button>
                <Button
                  onClick={async () => await deleteRecipe(record.id, null)}
                  danger
                >
                  Delete
                </Button>
              </>
            )}
          </Space>
        ),
      },
    ],
    reviews: [
      { title: "Review", dataIndex: "text", key: "text" },
      { title: "Stars", dataIndex: "stars", key: "stars" },
      { title: "Recipe", dataIndex: "recipe", key: "recipe" },
      {
        title: "Image",
        dataIndex: "image",
        key: "image",
        render: (url: string) => (
          <img src={url} alt="review" style={{ width: 100 }} />
        ),
      },
      {
        title: "Actions",
        key: "actions",
        render: (text, record) => (
          <Space size="middle">
            {authContext?.user?.username == userDetails.username && (
              <>
                <Button onClick={() => setIsModalVisible(true)}>Edit</Button>
                <Modal
                  title="Edit your review"
                  open={isModalVisible}
                  onCancel={() => setIsModalVisible(false)}
                  footer={null}
                >
                  <ReviewForm
                    recipeId={record.id}
                    setIsModalVisible={setIsModalVisible}
                    setReviews={setReviews}
                    requestType="edit"
                    reviewToEdit={record}
                  />
                </Modal>
                <Button
                  onClick={async () =>
                    await deleteReview({
                      recipeId: record.id,
                      username: authContext.user?.username as string,
                    })
                  }
                  danger
                >
                  Delete
                </Button>
              </>
            )}
          </Space>
        ),
      },
    ],
  };

  const dataSource = {
    liked: likedRecipes,
    recipes: recipes,
    reviews: reviews,
  } as any;

  return (
    <div className="profile-table-container">
      <Table
        columns={columns[segment]}
        dataSource={dataSource[segment]}
        rowKey={(record) => record.id}
        style={{ marginTop: 32 }}
      />
    </div>
  );
}
