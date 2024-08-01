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
