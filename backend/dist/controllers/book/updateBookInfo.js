import validate from "../../utils/validation.js";
import { updateBookSchema } from "../../validation/book.js";
import HttpExeception from "../../utils/HttpExeception.js";
import Exceptions from "../../utils/Exceptions.js";
import prisma from "../../services/db/prismaClient.js";
const updateBookInfo = async (req, res) => {
    const bookId = req.params.id;
    const validatedData = validate(req.body, updateBookSchema);
    if (!validatedData) {
        throw new HttpExeception("Invalid book data", 422, Exceptions.INVALID_DATA);
    }
    const book = await prisma.book.findUnique({
        where: {
            id: bookId,
        },
    });
    if (!book) {
        throw new HttpExeception("Book not found", 404, Exceptions.NOT_FOUND);
    }
    await prisma.book.update({
        where: {
            id: book.id
        },
        data: {
            ...validatedData
        }
    });
    res.status(201).json({
        ok: true,
        msg: "book updated successfully",
    });
};
export default updateBookInfo;
