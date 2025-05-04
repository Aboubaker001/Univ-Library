import { Router } from "express";
import userRouter from "./userRouter.js";
import bookRouter from "./bookRouter.js";

const mainRouter = Router();

//Import all the routers :
mainRouter.use('/user',userRouter);
//book router :
mainRouter.use('/book',bookRouter);

//Export the main router :
export default mainRouter;