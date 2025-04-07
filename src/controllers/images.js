import { getAllImages } from '../services/imeg-servives.js';

export const getAllImagesControllers = async (req, res) => {
  const images = await getAllImages();

  res.json({
    status: 200,
    message: 'Successfully loaded images',
    data: images,
  });
};
