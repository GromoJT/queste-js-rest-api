"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controllers/user.controller");
const router = (0, express_1.Router)();
// Get users
router.get('/', user_controller_1.getAllUsersController);
//Get selected user
router.get('/:id', user_controller_1.getUserByIdController);
//Create a user
router.post('/', user_controller_1.createUserController);
//modify a user
router.put('/:id', user_controller_1.updateUserController);
//delete user
router.delete('/:id', user_controller_1.deleteUserController);
exports.default = router;
//# sourceMappingURL=user.routes.js.map