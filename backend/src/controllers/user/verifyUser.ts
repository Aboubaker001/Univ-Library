import { Request, RequestHandler, Response } from 'express';
import { verifyJWT } from '../../utils/verifyJWT.js';
import prisma from '../../services/db/prismaClient.js';
import { CLIENT_URI } from '../../config/env.js';
const verifyUser: RequestHandler = async (req: Request, res: Response): Promise<void> => {
    const token = req.query.token;
    if (!token) {
        // throw new HttpExeception("Invalid verification link", 422,Exceptions.INVALID_DATA);
        res.redirect(`${CLIENT_URI}/main/faild_to_verify.html`);
    } else {
        //verify token
        const payload: { email: string } = verifyJWT(token as string) as { email: string };
        if (!payload) {
            //throw new HttpExeception("Invalid verification token", 422,Exceptions.INVALID_DATA);
            res.redirect(`${CLIENT_URI}/main/faild_to_verify.html`);
        } else {
            //update user
            await prisma.user.update({
                where: {
                    email: payload.email,
                },
                data: { isVerified: true }
            });
            /*res.status(200).json({
                ok: true,
                message: "User verified successfully"
            });*/
            res.redirect(`${CLIENT_URI}/main/login.html`);
        }
    }

}
export default verifyUser;