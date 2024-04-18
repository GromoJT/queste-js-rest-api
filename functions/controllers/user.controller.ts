import { Request, Response } from "express";
import { MyResponse } from "../myTypes";
import { getXataClient,User } from "../xata";
import dotenv from 'dotenv';
dotenv.config()

const xata = getXataClient();


// Get all users
export const getAllUsersController = async(req:Request,res:Response<MyResponse<User[]>>) =>{
    try {
        const users = await xata.db.user.getAll();
        return res.status(200).json({data:users});
    } catch (error) {
        console.log(error)
        return res.status(500).json({error:"Something went wrong"})
    }
    
};

//Get selected user
export const getUserByIdController = async (req:Request,res:Response<MyResponse<User>>) =>{
    try {
        const userId = req.params.id;
        const selectedUser = await xata.db.user.read(userId);

        if(!selectedUser){
            return res.status(404).json({error:'User not found'})
        }

        return res.status(200).json({data:selectedUser})
    } catch (error) {
        console.log(error)
        return res.status(500).json({error:"Something went wrong"})
    }
    
};

//Create a user
export const createUserController = async (req:Request<{},{},User>,res:Response<MyResponse<User>>) =>{
    try {
        const userBody = req.body;
        const createUser = await xata.db.user.create(userBody);
        return res.status(201).json({data:createUser})
    } catch (error) {
        console.log(error)
        res.status(500).json({error:"Something went wrong"})
    }
};

//modify a user
export const updateUserController = async (req:Request<{id: string},{},User>,res:Response<MyResponse<User>>) =>{
    try {
        const userId = req.params.id;
        const user = req.body;
        const updatedUser = await xata.db.user.update(userId,user)
        
        if(!updatedUser){
            return res.status(404).json({error:'User not found'})
        }

        return res.status(201).json({data:updatedUser})
    } catch (error) {
        console.log(error)
        return res.status(500).json({error:"Something went wrong"})
    }
    
};

//delete user
export const deleteUserController = async (req:Request<{id: string},{},{}>,res:Response<MyResponse<User>>) =>{
    try {
        const userId = req.params.id;
        const deletedUser = await xata.db.user.delete(userId)
        if(!deletedUser){
            return res.status(404).json({error:'User not found'})
        }
        return res.status(200).json({data:deletedUser})
    } catch (error) {
        console.log(error)
        res.status(500).json({error:"Something went wrong"})
    }
    
};
