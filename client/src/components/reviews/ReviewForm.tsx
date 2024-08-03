import { Form, Input, Button, Rate } from "antd";
import "../../assets/styles/Reviews.css";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import {
  CreateReviewDTO,
  CreateReviewFormValues,
  ReviewDTO,
} from "../../types/reviews/reviewDTOs";
import { reviewRecipe } from "../../services/reviews/reviewService";

export default function ReviewForm({
  recipeId,
  setIsModalVisible,
  setReviews,
  setTotalReviews,
}: any) {
  const [form] = Form.useForm();
  const authContext = useContext(AuthContext);

  const onFinish = async (values: CreateReviewFormValues) => {
    const createReviewDTO: CreateReviewDTO = {
      recipeId: recipeId,
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
    setIsModalVisible(false);
    form.resetFields();

    if (response) {
      setReviews((prevReviews: ReviewDTO[]) => [reviewDTO, ...prevReviews]);
      setTotalReviews((prevTotal: number) => prevTotal + 1);
    }
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
