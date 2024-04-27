import { Router} from "express";
import { 
    getAllUsersController,
    getUserByIdController,
    createUserController,
    updateUserController,
    deleteUserController
} from "../controllers/user.controller";

const router = Router();
const auth = require("../middleware/auth")
// Get users
router.get('/',[auth],getAllUsersController )

//Get selected user
router.get('/:id',[auth], getUserByIdController)

//Create a user
router.post('/',[auth], createUserController)

//modify a user
router.put('/:id',[auth],updateUserController)

//delete user
router.delete('/:id',[auth], deleteUserController)

export default router;