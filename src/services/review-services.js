import { reviewCollection } from '../db/models/review.js';

export const getAllReviews = async () => {
  const reviews = await reviewCollection.find();
  return reviews;
};

export const getReviewById = async (reviewId) => {
  const review = await reviewCollection.findById(reviewId);
  return review;
};
