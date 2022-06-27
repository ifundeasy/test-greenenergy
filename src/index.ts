import dotenv from 'dotenv';
import express, { Application, Request, Response } from 'express'
import logger from './utils/loggger';
import { Cart } from './models';
import { findBestDeal } from './services/calculator';

dotenv.config();
const port = process.env.PORT;

export const get = () => {
  const app: Application = express()

  // Body parsing Middleware
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.get('/', (_req: Request, res: Response) => {
    res.send('Hello World!');
  });

  app.post('/', (req: Request, res: Response) => {
    const carts = req.body as Cart[];
    res.send(findBestDeal(carts))
  })

  return app
}

export const start = () => {
    const app = get()
    try {
      app.listen(port, () => {
        logger.info(`Server is running at http://localhost:${port}`);
      });
    } catch (error: any) {
      logger.error(`Error occurred: ${error.message}`)
    }
}

start()
