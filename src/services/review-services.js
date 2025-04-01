import { ReviewCollection } from '../db/models/review.js';

export const getAllReviews = async () => {
  const reviews = await ReviewCollection.find();
  return reviews;
};

export const getReviewById = async (reviewId) => {
  const review = await ReviewCollection.findById(reviewId);
  return review;
};

export const createReview = async (payload) => {
  const review = await ReviewCollection.create(payload);
  return review;
};

export const deleteReview = async (reviewId) => {
  const review = await ReviewCollection.findByIdAndDelete({ _id: reviewId });
  return review;
};

export const updateReview = async (reviewId, payload, options = {}) => {
  const rewResult = await ReviewCollection.findByIdAndUpdate(
    { _id: reviewId },
    payload,
    { new: true, includeResultMetadata: true, ...options },
  );

  if (!rewResult || !rewResult.value) return null;

  return {
    review: rewResult.value,
    isNew: Boolean(rewResult?.lastErrorObject?.upserted),
  };
};
