import { Router } from 'express';
import {
  getReviewsControllers,
  getReviewByIdControllers,
  createReviewControllesr,
  deleteReviewControllers,
  patchReviewController,
} from '../controllers/reviews.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import { createReviewSchema } from '../validation/review.js';
import { isValidId } from '../middlewares/isValidId.js';

const router = Router();

router.get('/review', ctrlWrapper(getReviewsControllers));

router.get(
  '/review/:reviewId',
  isValidId,
  ctrlWrapper(getReviewByIdControllers),
);

router.post('/review', ctrlWrapper(createReviewControllesr));

router.delete(
  '/review/:reviewId',
  isValidId,
  ctrlWrapper(deleteReviewControllers),
);

router.patch(
  '/review/:reviewId',
  isValidId,
  validateBody(createReviewSchema),
  ctrlWrapper(patchReviewController),
);

export default router;
