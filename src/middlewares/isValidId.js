import { isValidObjectId } from 'mongoose';
import createHttpError from 'http-errors';

export const isValidId = (req, res, next) => {
  const { reviewId } = req.params;

  if (!isValidObjectId(reviewId)) {
    throw createHttpError(400, 'Bad request');
  }
  next();
};
