import prisma from "../../services/db/prismaClient.js";
const getBooksList = async (req, res) => {
    const books = await prisma.book.findMany();
    res.status(200).json({
        ok: true,
        data: books,
    });
};
export default getBooksList;
