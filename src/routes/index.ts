import { Router } from "express";
import { answersRouter } from "./answers.routes";
import { npsRouter } from "./nps.routes";
import { surveysRouter } from "./surveys.routes";
import { usersRouter } from "./users.routes";

const defaultRouter = Router();

defaultRouter.use("/users", usersRouter);
defaultRouter.use("/surveys", surveysRouter);
defaultRouter.use("/answers", answersRouter);
defaultRouter.use("/nps", npsRouter);

export { defaultRouter };
