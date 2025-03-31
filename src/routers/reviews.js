import { Router } from 'express';
import {
  getReviewsControllers,
  getReviewByIdControllers,
} from '../controllers/reviews.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const router = Router();

router.get('/review', ctrlWrapper(getReviewsControllers));

router.get('/review/:reviewId', ctrlWrapper(getReviewByIdControllers));

export default router;
