import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import mongoose from 'mongoose';
import { notFound, errorHandler } from './middlewares/route-handlers';

dotenv.config();

const app = express();

mongoose.connect('mongodb://mongo:27017/server', { useNewUrlParser: true });
app.use(cors({ origin: '*', credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.get('/api/v1/test', (req: any, res: any) => res.send('Hello World!'));

app.use(notFound);
app.use(errorHandler);

export { app };
