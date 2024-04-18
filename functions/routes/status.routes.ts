import { Router} from "express";
import { 
    getAllStatusesController,
    getStatusByIdController,
    createStatusController,
    updateStatusController,
    deleteStatusController
} from "../controllers/status.controller";

const router = Router();

// Get all statuses
router.get('/', getAllStatusesController)

//Get selected status
router.get('/:id', getStatusByIdController)

//Create a status
router.post('/', createStatusController)

//modify a status
router.put('/:id',updateStatusController)

//delete status
router.delete('/:id', deleteStatusController)

export default router;