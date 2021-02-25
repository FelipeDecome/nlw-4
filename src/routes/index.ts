import { Router } from "express";
import { surveysRouter } from "./surveys.routes";
import { usersRouter } from "./users.routes";

const defaultRouter = Router();

defaultRouter.use("/users", usersRouter);
defaultRouter.use("/surveys", surveysRouter);

export { defaultRouter };
