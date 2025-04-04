import {
  getAllReviews,
  getReviewById,
  createReview,
  deleteReview,
  updateReview,
} from '../services/review-services.js';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import createHttpError from 'http-errors';
import { parceFilterParams } from '../utils/parceFilterParams.js';

export const getReviewsControllers = async (req, res) => {
  const { sortBy, sortOrder } = parseSortParams(req.query);
  const { page, perPage } = parsePaginationParams(req.query);
  const filter = parceFilterParams(req.query);

  const reviews = await getAllReviews({
    page,
    perPage,
    sortBy,
    sortOrder,
    filter,
  });

  res.json({
    status: 200,
    message: 'Successfully found reviews',
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

export const createReviewController = async (req, res) => {
  const review = await createReview(req.body);

  res.status(201).json({
    status: 201,
    message: 'Successfully created review',
    data: review,
  });
};

export const deleteReviewControllers = async (req, res, next) => {
  const { reviewId } = req.params;

  const review = await deleteReview(reviewId);

  if (!review) {
    return next(createHttpError(404, 'Review not found'));
  }

  res.status(200).json({
    status: 200,
    message: 'Successfully deleted review',
  });
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
