import dotenv from 'dotenv';
import express from 'express';
import { Request, Response } from 'express';

dotenv.config();
const app = express();

app.get('/', (req: Request, res: Response) => {
  res.send('<h1>Hello World!</h1>');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Listening on port ${PORT}.`));