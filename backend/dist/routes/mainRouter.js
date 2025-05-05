import { Router } from "express";
import userRouter from "./userRouter.js";
import bookRouter from "./bookRouter.js";
const mainRouter = Router();
mainRouter.use('/user', userRouter);
mainRouter.use('/book', bookRouter);
export default mainRouter;
