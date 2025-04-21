import dotenv from 'dotenv';
import express from 'express';
import { errorHandler, notFoundHandler, errorPreprocessor } from './middlewares/ErrorHandler';
import { RegisterRoutes } from './routes';
import swaggerUi from 'swagger-ui-express';
import * as swagger from './config/swagger.json';
import morgan from 'morgan';
import cors from 'cors';
import RedisClient from './config/RedisClient';
import sessionConfig from './config/SessionConfig';
import cookieParser from 'cookie-parser';

dotenv.config();
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

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Listening on port ${PORT}.`));
