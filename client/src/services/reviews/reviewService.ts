import axios, { AxiosError } from "axios";
import {
  CreateReviewDTO,
  DeleteReviewDTO,
  EditReviewDTO,
  PagedReviewsDTO,
  UsersReviewsDTO,
} from "../../types/reviews/reviewDTOs";
import fireSwal from "../../utils/swalUtil";
import Swal from "sweetalert2";

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

export const editReview = async (editReviewDTO: EditReviewDTO) => {
  const result = await axios.post(
    `${import.meta.env.VITE_API_URL}/api/Reviews/editReview`,
    editReviewDTO
  );
  return result;
};

export const deleteReview = async (deleteReviewDTO: DeleteReviewDTO) => {
  const res = await Swal.fire({
    title: "Are you sure?",
    text: "Once deleted, you will not be able to recover this review!",
    icon: "warning",
    color: "white",
    background: "#181a27",
    confirmButtonColor: "#00b96b",
    showCancelButton: true,
  });

  if (res.isConfirmed) {
    const response = await axios.delete(
      `${import.meta.env.VITE_API_URL}/api/Reviews/deleteReview`,
      {
        data: deleteReviewDTO,
      }
    );

    fireSwal("Review successfully deleted!", "", "success", null);

    return response.data;
  }
};
