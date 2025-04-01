import {
  getAllReviews,
  getReviewById,
  createReview,
  deleteReview,
  updateReview,
} from '../services/review-services.js';
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

export const createReviewControllesr = async (req, res) => {
  const review = await createReview(req.body);

  res.status(201).json({
    status: 201,
    message: 'Succsessfully create review',
    data: review,
  });
};

export const deleteReviewControllers = async (req, res, next) => {
  const { reviewId } = req.params;

  const review = await deleteReview(reviewId);

  if (!review) {
    return next(createHttpError(404, 'Review not found'));
  }

  res.status(204).send();
};

export const patchReviewController = async (req, res, next) => {
  const { reviewId } = req.params;

  const result = await updateReview(reviewId, req.body);

  if (!result) {
    return next(createHttpError(404, 'Review not found'));
  }

  res.json({
    status: 200,
    message: 'Successfully patched a review',
    data: result.review,
  });
};
