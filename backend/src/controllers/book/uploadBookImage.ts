import { RequestHandler , Request , Response } from "express";
import prisma from "../../services/db/prismaClient.js";
import HttpExeception from "../../utils/HttpExeception.js";
import Exceptions from "../../utils/Exceptions.js";
import upload from "../../services/upload/uploadFile.js";

const uploadBookImage : RequestHandler = async (req : Request , res : Response) => {
    if (!req.file) {
        throw new HttpExeception("No image uploaded", 422, Exceptions.INVALID_DATA);
    }
    const bookId = req.params.id;
    const book = await prisma.book.findUnique({
        where : {
            id : bookId,
        }
    });
    if(!book){
        throw new HttpExeception("book not found",404,Exceptions.NOT_FOUND);
    }
    //upload book image :
    const url = await upload(req.file);
    if (!url) {
        throw new HttpExeception("Failed to upload image", 500, Exceptions.INTERNAL_ERROR);
    }
    await prisma.book.update({
        where : {
            id : book.id,
        },
        data : {
            coverUrl : url,
        }
    });
    res.status(200).json({
        ok : true,
        msg : "book image uploaded stuccessfuly",
    });
};

export default uploadBookImage;