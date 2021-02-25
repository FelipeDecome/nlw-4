import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import 'reflect-metadata';
import { AppError } from './Errors/AppError';
import { defaultRouter } from './routes';
import createConnection from './database';
import './containers';

createConnection();

const app = express();

app.use(express.json());

app.use(defaultRouter)

app.get('/', (req, res) => res.json({message: 'ok'}));

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if(err instanceof AppError)
  return response.status(err.errorCode).json({
    status: "error",
    message: err.message,
  });

  console.log(err);

  return response.status(500).json({
    status: "error",
    message: "Internal server error"
  });
});

export { app };
