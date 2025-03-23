import dotenv from 'dotenv';
import express from 'express';
import { errorHandler, notFoundHandler, errorPreprocessor } from './middlewares/ErrorHandler';
import { RegisterRoutes } from './routes';
import swaggerUi from 'swagger-ui-express';
import * as swagger from './config/swagger.json';
import morgan from 'morgan';

dotenv.config();
const app = express();

app.use(morgan(':date[web] | :url <:method, :status> | :response-time[3]'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swagger));
RegisterRoutes(app);
app.use(errorPreprocessor)
app.use(errorHandler);
app.use(notFoundHandler);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Listening on port ${PORT}.`));