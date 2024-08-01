import axios, { AxiosError } from "axios";
import { CreateReviewDTO } from "../../types/reviews/reviewDTOs";
import fireSwal from "../../utils/swalUtil";

export const reviewRecipe = async (createReviewDTO: CreateReviewDTO) => {
  try {
    await axios.post(
      `${import.meta.env.VITE_API_URL}/api/Reviews/reviewRecipe`,
      createReviewDTO
    );
  } catch (e) {
    const error = e as AxiosError;

    if (error.response?.status === 400) {
      fireSwal(
        "You've already reviewed this recipe",
        "You can go to your profile and edit your review",
        "warning",
        null
      );
    }
  }
};
