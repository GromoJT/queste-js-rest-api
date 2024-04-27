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
exports.deleteStatusController = exports.updateStatusController = exports.createStatusController = exports.getStatusByIdController = exports.getAllStatusesController = void 0;
const xata_1 = require("../xata");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const xata = (0, xata_1.getXataClient)();
const statusDB = xata.db.status;
// Get all statuses
const getAllStatusesController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const statuses = yield statusDB.getAll();
        return res.status(200).json({ data: statuses });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Something went wrong" });
    }
});
exports.getAllStatusesController = getAllStatusesController;
//Get selected status by id
const getStatusByIdController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const statusId = req.params.id;
        const selectedStatus = yield statusDB.read(statusId);
        if (!selectedStatus) {
            return res.status(404).json({ error: 'Status not found' });
        }
        return res.status(200).json({ data: selectedStatus });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Something went wrong" });
    }
});
exports.getStatusByIdController = getStatusByIdController;
//Create a user
const createStatusController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const statusBody = req.body;
        const createStatus = yield statusDB.create(statusBody);
        return res.status(201).json({ data: createStatus });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: "Something went wrong" });
    }
});
exports.createStatusController = createStatusController;
//modify a user
const updateStatusController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const statusId = req.params.id;
        const status = req.body;
        const updatedStatus = yield statusDB.update(statusId, status);
        if (!updatedStatus) {
            return res.status(404).json({ error: 'User not found' });
        }
        return res.status(201).json({ data: updatedStatus });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Something went wrong" });
    }
});
exports.updateStatusController = updateStatusController;
//delete user
const deleteStatusController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const statusId = req.params.id;
        const deletedStatus = yield statusDB.delete(statusId);
        if (!deletedStatus) {
            return res.status(404).json({ error: 'Status not found' });
        }
        return res.status(200).json({ data: deletedStatus });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: "Something went wrong" });
    }
});
exports.deleteStatusController = deleteStatusController;
//# sourceMappingURL=status.controller.js.map