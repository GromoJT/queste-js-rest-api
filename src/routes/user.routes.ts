import { Router} from "express";
import { 
    getAllUsersController,
    getUserByIdController,
    createUserController,
    updateUserController,
    deleteUserController
} from "../controllers/user.controller";

const router = Router();

// Get users
router.get('/',getAllUsersController )

//Get selected user
router.get('/:id', getUserByIdController)

//Create a user
router.post('/', createUserController)

//modify a user
router.put('/:id',updateUserController)

//delete user
router.delete('/:id', deleteUserController)

export default router;