import { Router } from 'express';
import {
  getReviewsControllers,
  getReviewByIdControllers,
  createReviewControllesr,
  deleteReviewControllers,
  patchReviewController,
} from '../controllers/reviews.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const router = Router();

router.get('/review', ctrlWrapper(getReviewsControllers));

router.get('/review/:reviewId', ctrlWrapper(getReviewByIdControllers));

router.post('/review', ctrlWrapper(createReviewControllesr));

router.delete('/review/:reviewId', ctrlWrapper(deleteReviewControllers));

router.patch('/review/:reviewId', ctrlWrapper(patchReviewController));

export default router;
