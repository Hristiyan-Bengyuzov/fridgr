import { Table } from "antd";
import { ColumnsType } from "antd/lib/table";
import { RecipeDTO } from "../../types/recipes/recipeDTOs";
import { UsersReviewsDTO } from "../../types/reviews/reviewDTOs";

interface DataTableProps {
  segment: string;
  recipes: RecipeDTO[];
  likedRecipes: RecipeDTO[];
  reviews: UsersReviewsDTO[];
}

export default function ProfileTable({
  segment,
  recipes,
  likedRecipes,
  reviews,
}: DataTableProps) {
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
    ],
  };

  const dataSource = {
    liked: likedRecipes,
    recipes: recipes,
    reviews: reviews,
  } as any;

  return (
    <Table
      columns={columns[segment]}
      dataSource={dataSource[segment]}
      rowKey={(record) => record.id}
      style={{ marginTop: 32 }}
    />
  );
}
