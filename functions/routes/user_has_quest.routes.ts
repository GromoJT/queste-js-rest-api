import { Router} from "express";
import { 
    getAllTakenQuestsController,
    getTakenQuestByIdController,
    createTakenQuestController,
    updateTakenQuestController,
    deleteTakenQuestController 
} from "../controllers/user_has_quests.controller";

const router = Router();

// Get all taken_quests
router.get('/', getAllTakenQuestsController)

//Get selected taken_quest
router.get('/:id', getTakenQuestByIdController)

//Create a taken_quest
router.post('/',createTakenQuestController)

//modify a taken_quests
router.put('/:id',updateTakenQuestController)

//delete taken_quest
router.delete('/:id',deleteTakenQuestController )

export default router;