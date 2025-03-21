import dotenv from 'dotenv';
import express from 'express';
import { errorHandler, notFoundHandler } from './middlewares/ErrorHandler';
import { RegisterRoutes } from './routes';
import swaggerUi from 'swagger-ui-express';
import * as swagger from './config/swagger.json';

dotenv.config();
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swagger));
RegisterRoutes(app);
app.use(errorHandler);
app.use(notFoundHandler);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Listening on port ${PORT}.`));