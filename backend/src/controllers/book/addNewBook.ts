import { RequestHandler , Request , Response } from "express";
import validate from "../../utils/validation.js";
import { newBookSchema } from "../../validation/book.js";
import HttpExeception from "../../utils/HttpExeception.js";
import Exceptions from "../../utils/Exceptions.js";
import prisma from "../../services/db/prismaClient.js";

const addNewBook : RequestHandler = async (req : Request , res : Response) => {
    const validatedData = validate(req.body,newBookSchema);
    if(!validatedData){
        throw new HttpExeception("Invalid book data",422,Exceptions.INVALID_DATA);
    }
    const book = await prisma.book.create({
        data : {
            ...validatedData,
        },
        select : {
            id : true
        }
    });
    res.status(201).json({
        ok : true,
        data : book.id,
        msg : "book create successfully",
    });
}
export default addNewBook;