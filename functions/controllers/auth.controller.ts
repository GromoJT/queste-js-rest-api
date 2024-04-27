import { Request, Response } from "express";
import { MyResponse } from "../myTypes";
import { UserPassesRecord, getXataClient} from "../xata";
import dotenv from 'dotenv';
import { count } from "console";
import {password_generator} from "../utils/password_generator"
dotenv.config()
const { body, validationResult } = require('express-validator');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt")



const xata = getXataClient();

const DB = xata.db.user_passes;
const DB_u = xata.db.user

const pKey = process.env.JWT;
// on post
export const getUserPassController = async(req:Request,res:Response<MyResponse<any>>) =>{
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
          return res.status(400).json({ error: errors.array() });
        }

        //const user_secrets = await DB.select(["*"]).filter({"user.email":req.body.email,"hash_pass":req.body.hash_pass}).getAll();
        const user = await DB.filter({"user.email":req.body.email}).getFirst()

        if(!user){
            return res.status(404).json({error:'user not found'})
        }

        const user_hash = await DB.select(["hash_pass"]).filter({"user.email":req.body.email}).getFirst()
        const valid = await bcrypt.compare(req.body.hash_pass,user_hash?.hash_pass)

        if(!valid){
            return res.status(404).json({error:'incorrect password'})
        }

        const token = jwt.sign({
            id:user.user?.id,
            email:req.body.email
        },pKey,{expiresIn:"15m"});

        return res.status(200).json({data:token});

    } catch (error) {
        console.log(error)
        return res.status(500).json({error:"Something went wrong"})
    }
    
};

export const registerUserController = async(req:Request,res:Response<MyResponse<any>>) =>{
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
          return res.status(400).json({ error: errors.array() });
        }

        const user = await DB.filter({"user.email":req.body.email}).getFirst()

        if(user){
            return res.status(404).json({error:'user with that email already exists'})
        }

       const new_user = await DB_u.create({
        name:req.body.name,
        email:req.body.email
        })
        if(new_user){
            console.log(new_user)
            const new_user_pass = await DB.create({
                user:new_user.id,
                hash_pass: await password_generator(req.body.hash_pass)
            });
            console.log(password_generator(req.body.hash_pass))
            return res.status(200).json({data:"OK"});
        }
        else{
            return res.status(404).json({error:'user cannot be created'})
        }

    } catch (error) {
        console.log(error)
        return res.status(500).json({error:"Something went wrong"})
    }
};


