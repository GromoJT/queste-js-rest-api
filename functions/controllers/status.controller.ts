import { Request, Response } from "express";
import { MyResponse } from "../myTypes";
import { getXataClient,Status } from "../xata";
import dotenv from 'dotenv';
dotenv.config()

const xata = getXataClient();

const statusDB = xata.db.status;

// Get all statuses
export const getAllStatusesController = async(req:Request,res:Response<MyResponse<Status[]>>) =>{
    try {
        const statuses = await statusDB.getAll();
        return res.status(200).json({data:statuses});
    } catch (error) {
        console.log(error)
        return res.status(500).json({error:"Something went wrong"})
    }
    
};

//Get selected status by id
export const getStatusByIdController = async (req:Request,res:Response<MyResponse<Status>>) =>{
    try {
        const statusId = req.params.id;
        const selectedStatus = await statusDB.read(statusId);

        if(!selectedStatus){
            return res.status(404).json({error:'Status not found'})
        }

        return res.status(200).json({data:selectedStatus})
    } catch (error) {
        console.log(error)
        return res.status(500).json({error:"Something went wrong"})
    }
    
};

//Create a user
export const createStatusController = async (req:Request<{},{},Status>,res:Response<MyResponse<Status>>) =>{
    try {
        const statusBody = req.body;
        const createStatus = await statusDB.create(statusBody);
        return res.status(201).json({data:createStatus})
    } catch (error) {
        console.log(error)
        res.status(500).json({error:"Something went wrong"})
    }
};

//modify a user
export const updateStatusController = async (req:Request<{id: string},{},Status>,res:Response<MyResponse<Status>>) =>{
    try {
        const statusId = req.params.id;
        const status = req.body;
        const updatedStatus = await statusDB.update(statusId,status)
        
        if(!updatedStatus){
            return res.status(404).json({error:'User not found'})
        }

        return res.status(201).json({data:updatedStatus})
    } catch (error) {
        console.log(error)
        return res.status(500).json({error:"Something went wrong"})
    }
    
};

//delete user
export const deleteStatusController = async (req:Request<{id: string},{},{}>,res:Response<MyResponse<Status>>) =>{
    try {
        const statusId = req.params.id;
        const deletedStatus = await statusDB.delete(statusId)
        if(!deletedStatus){
            return res.status(404).json({error:'Status not found'})
        }
        return res.status(200).json({data:deletedStatus})
    } catch (error) {
        console.log(error)
        res.status(500).json({error:"Something went wrong"})
    }
    
};
