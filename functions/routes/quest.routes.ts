import { Router} from "express";
import { 
    getAllQuestsController,
    getQuestByIdController,
    createQuestController,
    updateQuestController,
    deleteQuestController 
} from "../controllers/quest.controll";

const router = Router();

const auth = require("../middleware/auth")

// Get all quests
router.get('/',[auth], getAllQuestsController)

//Get selected quest
router.get('/:id',[auth], getQuestByIdController)

//Create a quest
router.post('/',[auth], createQuestController)

//modify a quest
router.put('/:id',[auth], updateQuestController)

//delete quest
router.delete('/:id',[auth], deleteQuestController)

export default router;