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
import { saveFileToUploadDir } from '../utils/saveFileToUploadDir.js';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';
import { getEnvVar } from '../utils/getEnvVar.js';

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
  const photo = req.file;

  let photoUrl;
  if (photo) {
    if (getEnvVar('ENABLE_CLOUDINARY') === 'true') {
      photoUrl = await saveFileToCloudinary(photo);
    } else {
      photoUrl = await saveFileToUploadDir(photo);
    }
  }

  const review = await createReview({ ...req.body, photo: photoUrl });

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
  const photo = req.file;

  let photoUrl;
  if (photo) {
    if (getEnvVar('ENABLE_CLOUDINARY') === 'true') {
      photoUrl = await saveFileToCloudinary(photo);
    } else {
      photoUrl = await saveFileToUploadDir(photo);
    }
  }
  const result = await updateReview(reviewId, { ...req.body, photo: photoUrl });

  if (!result) {
    return next(createHttpError(404, 'Review not found'));
  }

  res.json({
    status: 200,
    message: 'Successfully patched a review',
    data: result.review,
  });
};
