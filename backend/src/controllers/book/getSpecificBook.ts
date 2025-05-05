import { RequestHandler , Request , Response } from "express";
import prisma from "../../services/db/prismaClient.js";
import HttpExeception from "../../utils/HttpExeception.js";
import Exceptions from "../../utils/Exceptions.js";

const getBook : RequestHandler = async(req : Request , res : Response) => {
    const bookId = req.params.id;
    const book = await prisma.book.findUnique({
        where : {
            id : bookId,
        }
    });
    if(!book){
        throw new HttpExeception("Book not found",404,Exceptions.NOT_FOUND);
    }
    res.status(200).json({
        ok : true,
        data : book,
    });
}
export default getBook;