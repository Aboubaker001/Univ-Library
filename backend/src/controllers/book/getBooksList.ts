import { RequestHandler , Request , Response } from "express";
import prisma from "../../services/db/prismaClient.js";

const getBooksList : RequestHandler = async(req : Request , res : Response) => {
    const books = await prisma.book.findMany();
    res.status(200).json({
        ok : true,
        data : books,
    });
}
export default getBooksList;