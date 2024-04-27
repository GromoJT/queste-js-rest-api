import { Router} from "express";
import { 
    getAllStatusesController,
    getStatusByIdController,
    createStatusController,
    updateStatusController,
    deleteStatusController
} from "../controllers/status.controller";
const auth = require("../middleware/auth")
const router = Router();

// Get all statuses
router.get('/',[auth], getAllStatusesController)

//Get selected status
router.get('/:id',[auth], getStatusByIdController)

//Create a status
router.post('/',[auth], createStatusController)

//modify a status
router.put('/:id',[auth], updateStatusController)

//delete status
router.delete('/:id',[auth], deleteStatusController)

export default router;