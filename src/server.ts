import 'reflect-metadata';
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';

import { defaultRouter } from './routes';

import './database';
import { AppError } from './Errors/AppError';

const app = express();

app.use(express.json());
app.use(defaultRouter)

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

app.listen(3333, () => console.log("Server running!"));
