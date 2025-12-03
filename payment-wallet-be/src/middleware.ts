import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from "./config";


interface tokenData{
    token : string
}


export const authMiddleware = ( req: Request, res: Response, next: NextFunction) => {
    const token : any = req.headers.authorization;
    const decodedToken = jwt.verify(token, JWT_SECRET);

    if(decodedToken){
        //@ts-ignore
        req.userId = decodedToken.userId;
        next();
    }
    else{
        res.status(403).json({
            message:"User not signed in"
        })
    }
   
}