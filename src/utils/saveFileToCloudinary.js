import cloudinary from 'cloudinary';
import fs from 'node:fs/promises';
import { getEnvVar } from './getEnvVar.js';
import { CLOUDINARY } from '../constants/index.js';

cloudinary.v2.config({
  secure: true,
  cloud_name: getEnvVar(CLOUDINARY.CLOUDINARY_NAME),
  api_key: getEnvVar(CLOUDINARY.CLOUDINARY_KEY),
  api_secret: getEnvVar(CLOUDINARY.CLOUDINARY_SECRET),
});

export const saveFileToCloudinary = async (file) => {
  const response = await cloudinary.v2.uploader.upload(file.path, {
    folder: 'vishivanka/icon',
  });

  await fs.unlink(file.path);
  return response.secure_url;
};
