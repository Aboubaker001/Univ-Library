import jwt from "jsonwebtoken"
import { JWT } from "../config/env.js"

export const signJwt =  (data : object,expireIn : number) : string => {
    const token = jwt.sign(data, JWT, { expiresIn: expireIn });
    return token;
}