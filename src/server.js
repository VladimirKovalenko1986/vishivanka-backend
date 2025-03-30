import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import { getEnvVar } from './utils/getEnvVar.js';
import { getAllReviews, getReviewById } from './services/review-services.js';

const PORT = Number(getEnvVar('PORT', '3000'));

export const startServer = () => {
  const app = express();

  app.use(cors());

  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  app.use((req, res, next) => {
    console.log(`Time: ${new Date().toLocaleString()}`);
    next();
  });

  app.use(express.json());

  app.get('/review', async (req, res) => {
    const reviews = await getAllReviews();

    res.status(200).json({
      data: reviews,
    });
  });
  app.get('/review/:reviewId', async (req, res, next) => {
    const { reviewId } = req.params;

    const review = await getReviewById(reviewId);

    if (!review) {
      res.status(404).json({
        message: 'Review not found!',
      });
      return;
    }
    res.status(200).json({
      data: review,
    });
  });

  app.use('*', (req, res, next) => {
    res.status(404).json({
      message: 'Not found',
    });
  });

  app.use((err, req, res, next) => {
    res.status(500).json({
      message: 'Somethin went wrong',
      errer: err.message,
    });
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
