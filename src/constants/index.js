import path from 'node:path';

export const authEmailFormate = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const SORT_ORDER = {
  ASC: 'asc',
  DESC: 'desc',
};

export const TEMP_UPLOAD_DIR = path.join(process.cwd(), 'temp');

export const UPLOAD_DIR = path.join(process.cwd(), 'uploads');

export const CLOUDINARY = {
  CLOUDINARY_NAME: 'CLOUDINARY_NAME',
  CLOUDINARY_KEY: 'CLOUDINARY_KEY',
  CLOUDINARY_SECRET: 'CLOUDINARY_SECRET',
};
