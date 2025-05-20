import dotenv from 'dotenv';
import express from 'express';
import { errorHandler, notFoundHandler, errorPreprocessor } from './middlewares/ErrorHandler';
import { RegisterRoutes } from './routes';
import swaggerUi from 'swagger-ui-express';
import * as swagger from './config/swagger.json';
import morgan from 'morgan';
import cors from 'cors';
import './config/RedisClient';
import './config/TransformersRedisClient';
import './config/OtpRedisClient';
import sessionConfig from './config/SessionConfig';
import cookieParser from 'cookie-parser';

export default function createServer() {
  dotenv.config({ path: process.env.NODE_ENV?.trim() === 'test' ? '.env.test' : '.env' });

  const app = express();

  app.use(cors({ origin: process.env.MENUCHI_FRONT_URL, credentials: true }));
  app.use(morgan(':date[web] | :url <:method, :status> | :response-time[3]ms'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser(process.env.COOKIE_PRIVATE_KEY));
  app.use(sessionConfig());

  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swagger));
  RegisterRoutes(app);
  app.use(errorPreprocessor)
  app.use(errorHandler);
  app.use(notFoundHandler);

  return app;
}