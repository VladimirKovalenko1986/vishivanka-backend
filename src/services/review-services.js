import { ReviewCollection } from '../db/models/review.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';
import { SORT_ORDER } from '../constants/index.js';

export const getAllReviews = async ({
  page = 1,
  perPage = 10,
  sortOrder = SORT_ORDER.ASC,
  sortBy = '_id',
}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const reviewsQuery = ReviewCollection.find();
  const reviewsCount = await ReviewCollection.find()
    .merge(reviewsQuery)
    .countDocuments();

  const reviews = await reviewsQuery
    .skip(skip)
    .limit(limit)
    .sort({ [sortBy]: sortOrder })
    .exec();

  const paginationData = calculatePaginationData(reviewsCount, perPage, page);

  return {
    data: reviews,
    ...paginationData,
  };
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
  const review = await ReviewCollection.findByIdAndUpdate(reviewId, payload, {
    new: true,
    ...options,
  });

  if (!review) return null;

  return {
    review,
    isNew: false, // бо findByIdAndUpdate не створює новий документ (без upsert)
  };
};
