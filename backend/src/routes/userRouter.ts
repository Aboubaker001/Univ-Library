import { Router } from "express";
import newUser from "../controllers/user/newUser.js";
import login from "../controllers/user/login.js";
import { errorHandler } from "../middleware/errorHandler.js";
import verifyUser from "../controllers/user/verifyUser.js";

const userRouter = Router();

//signup :
userRouter.post("/signup",errorHandler(newUser));
//login :
userRouter.post("/login",errorHandler(login));
//verification
userRouter.get("/verify",errorHandler(verifyUser));


export default userRouter;
