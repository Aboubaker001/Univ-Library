import Exceptions from "../utils/Exceptions.js";
import HttpExeception from "../utils/HttpExeception.js";
import{NextFunction, Request,RequestHandler,Response} from "express";
export const errorResponse = (err : HttpExeception,req : Request , res : Response,next : NextFunction ) =>  {
    console.log(err);
    res.status(err.status).json({
        ok : false,
        msg : err.message,
        error : err.error
    })
}
export const errorHandler = (fun : RequestHandler) => {
    return async (req : Request , res : Response , next : NextFunction) => {
        try{
            await fun(req,res,next);
        }catch(err){
            console.log(err);
            if(err instanceof HttpExeception){
                next(err);
            }else{
                next(new HttpExeception("Something went worng",500,Exceptions.INTERNAL_ERROR));
            }
        }
    }
}