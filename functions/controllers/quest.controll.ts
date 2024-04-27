import { Request, Response } from "express";
import { MyResponse } from "../myTypes";
import { getXataClient,Quest} from "../xata";
import dotenv from 'dotenv';

dotenv.config()

const xata = getXataClient();

const DB = xata.db.quest;


// Get all quests
export const getAllQuestsController = async(req:Request,res:Response<MyResponse<any>>) =>{
    try {
        const quests = await DB.select(["quest_name", "description", "expiration_date", "time_in_h","user_id_giver.id"]).getAll();
        if(!quests){
            return res.status(404).json({error:'Quests not found'})
        }
        return res.status(200).json({data:quests});
    } catch (error) {
        console.log(error)
        return res.status(500).json({error:"Something went wrong"})
    }
    
};

//Get selected quest by id
export const getQuestByIdController = async (req:Request,res:Response<MyResponse<any>>) =>{
    try {
        const questsId = req.params.id;
        const selectedQuests = await DB.read(questsId);

        if(!selectedQuests){
            return res.status(404).json({error:'Quest not found'})
        }

        return res.status(200).json({data:selectedQuests})
    } catch (error) {
        console.log(error)
        return res.status(500).json({error:"Something went wrong"})
    }
    
};

//Create a user
export const createQuestController = async (req:Request<{},{},Quest>,res:Response<MyResponse<any>>) =>{
    try {
        const statusBody = req.body;
        const createStatus = await DB.create(statusBody);
        return res.status(201).json({data:createStatus})
    } catch (error) {
        console.log(error)
        res.status(500).json({error:"Something went wrong"})
    }
};

//modify a quest
export const updateQuestController = async (req:Request<{id: string},{},Quest>,res:Response<MyResponse<any>>) =>{
    try {
        const questId = req.params.id;
        const questBody = req.body;
        const updatedQuest = await DB.update(questId,questBody)
        
        if(!updatedQuest){
            return res.status(404).json({error:'Quest not found'})
        }

        return res.status(201).json({data:updatedQuest})
    } catch (error) {
        console.log(error)
        return res.status(500).json({error:"Something went wrong"})
    }
    
};

//delete quest
export const deleteQuestController = async (req:Request<{id: string},{},{}>,res:Response<MyResponse<any>>) =>{
    try {
        const questId = req.params.id;
        const deletedQuest = await DB.delete(questId)
        if(!deletedQuest){
            return res.status(404).json({error:'Quest not found'})
        }
        return res.status(200).json({data:deletedQuest})
    } catch (error) {
        console.log(error)
        res.status(500).json({error:"Something went wrong"})
    }
    
};
