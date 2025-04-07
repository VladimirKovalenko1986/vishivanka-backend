import { model, Schema } from 'mongoose';

const imegSchema = new Schema({
  text: { type: String, required: true },
  textPrice: { type: String, required: true },
  url: { type: String, required: true },
  url2x: { type: String, required: true },
});

export const ImegCollection = model('images', imegSchema);
