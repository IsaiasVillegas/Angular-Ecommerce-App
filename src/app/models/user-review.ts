export type UserReview = {
  id: string;
  productId: string;
  userName: string;
  userImageUrl: string;
  rating: number;
  title: string;
  comment: string;
  reviewDate: Date;
};

export type AppReviewParams = Pick<UserReview, 'title' | 'comment' | 'rating'>;
