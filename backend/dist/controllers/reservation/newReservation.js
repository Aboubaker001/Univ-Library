import HttpExeception from "../../utils/HttpExeception.js";
import Exceptions from "../../utils/Exceptions.js";
import prisma from "../../services/db/prismaClient.js";
import { RESERVATION_EXPIRE, RESERVATION_LIMIT } from "../../config/env.js";
const newReservation = async (req, res) => {
    const bookId = req.params.bookId;
    const book = await prisma.book.findUnique({
        where: {
            id: bookId,
            status: "AVAILABLE"
        }
    });
    if (!book) {
        throw new HttpExeception("The book you try to reserve is not found", 404, Exceptions.NOT_FOUND);
    }
    const user = await prisma.user.findUnique({
        where: {
            id: req.userId,
        },
        select: {
            reservationLimit: true,
        }
    });
    if (!user) {
        throw new HttpExeception("User not found", 404, Exceptions.NOT_FOUND);
    }
    if (user.reservationLimit >= RESERVATION_LIMIT) {
        throw new HttpExeception("You have reached the reservation limit", 400, Exceptions.NOT_OK);
    }
    const reservation = await prisma.reservation.create({
        data: {
            bookId: bookId,
            userId: req.userId,
            startDate: new Date(),
            returnDate: new Date(new Date().setDate(new Date().getDate() + RESERVATION_EXPIRE)),
        }
    });
    res.status(201).json({
        ok: true,
        msg: "Reservation created successfully",
    });
};
export default newReservation;
