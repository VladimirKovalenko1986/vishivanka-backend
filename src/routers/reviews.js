import { Router } from 'express';
import {
  getReviewsControllers,
  getReviewByIdControllers,
  createReviewController,
  deleteReviewControllers,
  patchReviewController,
} from '../controllers/reviews.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import { createReviewSchema } from '../validation/review.js';
import { isValidId } from '../middlewares/isValidId.js';

const router = Router();

router.get('/', ctrlWrapper(getReviewsControllers));

router.get('/:reviewId', isValidId, ctrlWrapper(getReviewByIdControllers));

router.post('/', ctrlWrapper(createReviewController));

router.delete('/:reviewId', isValidId, ctrlWrapper(deleteReviewControllers));

router.patch(
  '/:reviewId',
  isValidId,
  validateBody(createReviewSchema),
  ctrlWrapper(patchReviewController),
);

export default router;
