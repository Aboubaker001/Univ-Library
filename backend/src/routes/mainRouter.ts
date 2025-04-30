import { Router } from "express";
import userRouter from "./userRouter.js";

const mainRouter = Router();

//Import all the routers :
mainRouter.use('/user',userRouter);

//Export the main router :
export default mainRouter;