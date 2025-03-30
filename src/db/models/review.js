import { model, Schema } from 'mongoose';
import { authEmailFormate } from '../../constants/index.js';

const reviewSchema = new Schema({
  username: { type: String, required: true },
  email: {
    type: String,
    match: [authEmailFormate, 'is invalid'],
    require: true,
    unique: true,
  },
  comments: {
    type: String,
    require: true,
  },
});

export const reviewCollection = model('reviews', reviewSchema);
