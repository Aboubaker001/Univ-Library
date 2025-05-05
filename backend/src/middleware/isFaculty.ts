import { Request, Response, NextFunction, RequestHandler } from "express";
import { verifyJWT } from "../utils/verifyJWT.js";
import prisma from "../services/db/prismaClient.js";
import HttpExeception from "../utils/HttpExeception.js";
import Exceptions from "../utils/Exceptions.js";

const isFaculty: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    if (!token) {
        throw new HttpExeception("Unauthorized", 401,Exceptions.UNAUTHERIZED)
    }
    const payload = verifyJWT(token) as { id: string, role: string };
    if (payload) {
        const user = await prisma.user.findUnique({
            where: {
                id: payload.id
            }
        });
        if (user && user.role === "FACULTY") {
            next();
        } else {
            throw new HttpExeception("Unauthorized", 401,Exceptions.UNAUTHERIZED)
        }
    } else {
        throw new HttpExeception("Unauthorized", 401,Exceptions.UNAUTHERIZED)
    }
}
export default isFaculty;