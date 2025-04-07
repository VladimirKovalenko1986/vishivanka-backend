import { ImegCollection } from '../db/models/imeg.js';

export const getAllImages = async () => {
  return await ImegCollection.find();
};
