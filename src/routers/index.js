import { Router } from 'express';
import reviewRoute from './reviews.js';
import imagesRoute from './images.js';

const router = Router();

router.use('/review', reviewRoute);
router.use('/imeg', imagesRoute);

export default router;
