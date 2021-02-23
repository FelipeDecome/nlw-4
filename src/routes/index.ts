import { Router } from "express";
import { usersRouter } from "./users.routes";

const defaultRouter = Router();

defaultRouter.use("/users", usersRouter);

export { defaultRouter };
