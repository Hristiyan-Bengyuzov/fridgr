import { Form, Input, Button, Rate } from "antd";
import "../../assets/styles/Reviews.css";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import {
  CreateReviewDTO,
  CreateReviewFormValues,
  EditReviewDTO,
  ReviewDTO,
  UsersReviewsDTO,
} from "../../types/reviews/reviewDTOs";
import { editReview, reviewRecipe } from "../../services/reviews/reviewService";

interface ReviewFormProps {
  recipeId: string;
  setIsModalVisible: (visible: boolean) => void;
  setReviews: (reviews: any) => void;
  setTotalReviews?: any;
  requestType: "create" | "edit";
  reviewToEdit?: UsersReviewsDTO;
}

export default function ReviewForm({
  recipeId,
  setIsModalVisible,
  setReviews,
  setTotalReviews,
  requestType,
  reviewToEdit,
}: ReviewFormProps) {
  const [form] = Form.useForm();
  const authContext = useContext(AuthContext);

  if (requestType === "edit" && reviewToEdit) {
    form.setFieldsValue({
      review: reviewToEdit.text,
      rating: reviewToEdit.stars,
    });
  }

  const onFinish = async (values: CreateReviewFormValues) => {
    if (requestType === "create") {
      const createReviewDTO: CreateReviewDTO = {
        recipeId: parseInt(recipeId),
        username: authContext?.user?.username as string,
        text: values.review,
        stars: values.rating,
      };

      const reviewDTO: ReviewDTO = {
        username: authContext?.user?.username as string,
        image: authContext?.user?.image as string,
        text: values.review,
        stars: values.rating,
      };

      const response = await reviewRecipe(createReviewDTO);
      if (response) {
        setReviews((prevReviews: ReviewDTO[]) => [reviewDTO, ...prevReviews]);
        setTotalReviews((prevTotal: number) => prevTotal + 1);
      }
    } else if (requestType === "edit" && reviewToEdit) {
      const editReviewDTO: EditReviewDTO = {
        recipeId: parseInt(recipeId),
        username: authContext?.user?.username as string,
        text: values.review,
        stars: values.rating,
      };

      const response = await editReview(editReviewDTO);
      if (response) {
        setReviews((prevReviews: UsersReviewsDTO[]) =>
          prevReviews.map((review: UsersReviewsDTO) =>
            review.id === reviewToEdit.id
              ? { ...review, text: values.review, stars: values.rating }
              : review
          )
        );
      }
    }

    setIsModalVisible(false);
    form.resetFields();
  };

  return (
    <div className="review-form-container">
      <Form
        className="review-form"
        form={form}
        onFinish={onFinish}
        layout="vertical"
      >
        <Form.Item
          name="review"
          label="Review"
          rules={[{ required: true, message: "Please input your review!" }]}
        >
          <Input.TextArea rows={4} />
        </Form.Item>
        <Form.Item
          name="rating"
          label="Rating"
          rules={[{ required: true, message: "Please select a rating!" }]}
        >
          <Rate />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit Review
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
