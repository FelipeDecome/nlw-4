import 'reflect-metadata';
import 'dotenv/config';

import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import { errors as celebrateErrors } from 'celebrate';

import { AppError } from './Errors/AppError';
import { defaultRouter } from './routes';
import createConnection from './database';
import './containers';

createConnection();

const app = express();

app.use(express.json());

app.use(defaultRouter)

app.use(celebrateErrors());

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
