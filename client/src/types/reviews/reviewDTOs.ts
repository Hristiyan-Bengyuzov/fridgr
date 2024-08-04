export interface CreateReviewDTO {
  recipeId: number;
  username: string;
  text: string;
  stars: number;
}

export interface CreateReviewFormValues {
  review: string;
  rating: number;
}

export interface PagedReviewsDTO {
  totalReviews: number;
  reviews: ReviewDTO[];
}

export interface ReviewDTO {
  username: string;
  image: string;
  text: string;
  stars: number;
}

export interface UsersReviewsDTO {
  id: number;
  text: string;
  stars: number;
  recipe: string;
  image: string;
}
