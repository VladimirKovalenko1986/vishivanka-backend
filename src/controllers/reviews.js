import { getAllReviews, getReviewById } from '../services/review-services.js';
import createHttpError from 'http-errors';

export const getReviewsControllers = async (req, res, next) => {
  const reviews = await getAllReviews();

  res.status(200).json({
    data: reviews,
  });
};

export const getReviewByIdControllers = async (req, res, next) => {
  const { reviewId } = req.params;

  const review = await getReviewById(reviewId);

  if (!review) {
    throw createHttpError(404, 'Review not found');
  }

  res.json({
    status: 200,
    message: `Successfully found review with id ${reviewId}!`,
    data: review,
  });
};
