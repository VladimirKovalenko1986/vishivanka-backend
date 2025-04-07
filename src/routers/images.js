import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { getAllImagesControllers } from '../controllers/images.js';

const router = Router();

router.get('/', ctrlWrapper(getAllImagesControllers));

export default router;
