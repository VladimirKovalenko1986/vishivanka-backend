import Joi from 'joi';
import { authEmailFormate } from '../constants/index.js';

export const createReviewSchema = Joi.object({
  username: Joi.string().min(3).max(20).required(),
  email: Joi.string().pattern(authEmailFormate).required(),
  comments: Joi.string().min(5).max(150).required(),
  photo: Joi.string(),
});
