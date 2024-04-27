"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUserController = exports.updateUserController = exports.createUserController = exports.getUserByIdController = exports.getAllUsersController = void 0;
const xata_1 = require("../xata");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const xata = (0, xata_1.getXataClient)();
// Get all users
const getAllUsersController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield xata.db.user.getAll();
        return res.status(200).json({ data: users });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Something went wrong" });
    }
});
exports.getAllUsersController = getAllUsersController;
//Get selected user
const getUserByIdController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.id;
        const selectedUser = yield xata.db.user.read(userId);
        if (!selectedUser) {
            return res.status(404).json({ error: 'User not found' });
        }
        return res.status(200).json({ data: selectedUser });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Something went wrong" });
    }
});
exports.getUserByIdController = getUserByIdController;
//Create a user
const createUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userBody = req.body;
        const createUser = yield xata.db.user.create(userBody);
        return res.status(201).json({ data: createUser });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: "Something went wrong" });
    }
});
exports.createUserController = createUserController;
//modify a user
const updateUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.id;
        const user = req.body;
        const updatedUser = yield xata.db.user.update(userId, user);
        if (!updatedUser) {
            return res.status(404).json({ error: 'User not found' });
        }
        return res.status(201).json({ data: updatedUser });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Something went wrong" });
    }
});
exports.updateUserController = updateUserController;
//delete user
const deleteUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.id;
        const deletedUser = yield xata.db.user.delete(userId);
        if (!deletedUser) {
            return res.status(404).json({ error: 'User not found' });
        }
        return res.status(200).json({ data: deletedUser });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: "Something went wrong" });
    }
});
exports.deleteUserController = deleteUserController;
//# sourceMappingURL=user.controller.js.map