const jwt = require("jsonwebtoken");
import { Request, Response } from "express";
import { MyResponse } from "../myTypes";
import dotenv from 'dotenv';
import { getXataClient } from "../xata";


const xata = getXataClient();
const DB = xata.db.user;

module.exports = async (req:Request,res:Response<any>,_next: any) => {
    const token = req.header("x-auth-token");
    const userEmail = req.header("x-auth-email")

    if (!token || !userEmail) {
        return res.status(401).json({ error: 'Access denied. No token or user email provided' });
    }



    try {
        const decoded:any = jwt.verify(token,process.env.JWT);
        res.locals.jwtPayload = decoded;
        res.locals.userId = res.locals.jwtPayload.id;
        res.locals.email = res.locals.jwtPayload.email;
    
        const testUser = await DB.select(["email","id"]).filter({"email":res.locals.email,"id":res.locals.id}).getFirst()
    
            if(!testUser || testUser.email != userEmail) {
                return res.status(401).json({error:"Token data is not matching data of user performing action"})
            }

        res.setHeader("token",String(token));
        res.setHeader("userEmail",String(userEmail));
        _next()
    } catch (error) {
        return res.status(401).json({error:'Token expired'});
    }
}