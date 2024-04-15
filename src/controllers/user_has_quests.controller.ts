import { Request, Response } from "express";
import { MyResponse } from "../myTypes";
import { getXataClient,Quest, UserHasQuest} from "../xata";
import dotenv from 'dotenv';
dotenv.config()

const xata = getXataClient();

const DB = xata.db.user_has_quest;


// Get all quests
export const getAllTakenQuestsController = async(req:Request,res:Response<MyResponse<any>>) =>{
    try {
        const quests = await DB.select(["returnedAt", "veryfiedAt",'quest_id.id','status_id.status_name','user_taker_id.id']).getAll();
        if(!quests){
            return res.status(404).json({error:'Quests not found'})
        }
        return res.status(200).json({data:quests});
    } catch (error) {
        console.log(error)
        return res.status(500).json({error:"Something went wrong"})
    }
    
};

//Get selected takenQuest by id
export const getTakenQuestByIdController = async (req:Request,res:Response<MyResponse<any>>) =>{
    try {
        const takenQuestsId = req.params.id;
        const selectedTakenQuests = await DB.read(takenQuestsId);

        if(!selectedTakenQuests){
            return res.status(404).json({error:'Quest not found'})
        }

        return res.status(200).json({data:selectedTakenQuests})
    } catch (error) {
        console.log(error)
        return res.status(500).json({error:"Something went wrong"})
    }
    
};

//Create a takenQuest
export const createTakenQuestController = async (req:Request<{},{},Quest>,res:Response<MyResponse<any>>) =>{
    try {
        const takenQuestBody = req.body;
        const createTakenQuest = await DB.create(takenQuestBody);
        return res.status(201).json({data:createTakenQuest})
    } catch (error) {
        console.log(error)
        res.status(500).json({error:"Something went wrong"})
    }
};

//modify a quest
export const updateTakenQuestController = async (req:Request<{id: string},{},Quest>,res:Response<MyResponse<any>>) =>{
    try {
        const takenQuestId = req.params.id;
        const takenQuestBody = req.body;
        const updatedTakenQuest = await DB.update(takenQuestId,takenQuestBody)
        
        if(!updatedTakenQuest){
            return res.status(404).json({error:'takenQuest not found'})
        }

        return res.status(201).json({data:updatedTakenQuest})
    } catch (error) {
        console.log(error)
        return res.status(500).json({error:"Something went wrong"})
    }
    
};

//delete quest
export const deleteTakenQuestController = async (req:Request<{id: string},{},{}>,res:Response<MyResponse<any>>) =>{
    try {
        const takenQuestId = req.params.id;
        const deleteTakendQuest = await DB.delete(takenQuestId)
        if(!deleteTakendQuest){
            return res.status(404).json({error:'Quest not found'})
        }
        return res.status(200).json({data:deleteTakendQuest})
    } catch (error) {
        console.log(error)
        res.status(500).json({error:"Something went wrong"})
    }
    
};
