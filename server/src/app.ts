import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import mongoose from 'mongoose';
import { notFound, errorHandler } from './middlewares/route-handlers';
import { routes } from './routes';

dotenv.config();

const app = express();

mongoose.connect('mongodb://mongo:27017/server', { useNewUrlParser: true });
app.use(cookieParser());
app.use(cors({ origin: '*', credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.use('/api/v1', routes);

app.use(notFound);
app.use(errorHandler);

export { app };
