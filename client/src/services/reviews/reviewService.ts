import axios, { AxiosError } from "axios";
import {
  CreateReviewDTO,
  PagedReviewsDTO,
  UsersReviewsDTO,
} from "../../types/reviews/reviewDTOs";
import fireSwal from "../../utils/swalUtil";

export const reviewRecipe = async (createReviewDTO: CreateReviewDTO) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/Reviews/reviewRecipe`,
      createReviewDTO
    );

    return response.data;
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

export const getReviews = async (
  recipeId: string,
  currentPage: number
): Promise<PagedReviewsDTO> => {
  const response = await axios.get<PagedReviewsDTO>(
    `${import.meta.env.VITE_API_URL}/api/Reviews/getReviews`,
    {
      params: { recipeId: recipeId, currentPage: currentPage },
    }
  );
  return response.data;
};

export const getUsersReviews = async (
  username: string
): Promise<UsersReviewsDTO[]> => {
  const result = await axios.get<UsersReviewsDTO[]>(
    `${import.meta.env.VITE_API_URL}/api/Reviews/getUsersReviews/${username}`
  );

  return result.data;
};
