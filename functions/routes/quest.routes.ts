import { Router} from "express";
import { 
    getAllQuestsController,
    getQuestByIdController,
    createQuestController,
    updateQuestController,
    deleteQuestController 
} from "../controllers/quest.controll";

const router = Router();

// Get all quests
router.get('/', getAllQuestsController)

//Get selected quest
router.get('/:id', getQuestByIdController)

//Create a quest
router.post('/',createQuestController)

//modify a quest
router.put('/:id',updateQuestController)

//delete quest
router.delete('/:id', deleteQuestController)

export default router;