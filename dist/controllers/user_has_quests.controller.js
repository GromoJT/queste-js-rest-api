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
exports.deleteTakenQuestController = exports.updateTakenQuestController = exports.createTakenQuestController = exports.getTakenQuestByIdController = exports.getAllTakenQuestsController = void 0;
const xata_1 = require("../xata");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const xata = (0, xata_1.getXataClient)();
const DB = xata.db.user_has_quest;
// Get all quests
const getAllTakenQuestsController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const quests = yield DB.select(["returnedAt", "veryfiedAt", 'quest_id.id', 'status_id.status_name', 'user_taker_id.id']).getAll();
        if (!quests) {
            return res.status(404).json({ error: 'Quests not found' });
        }
        return res.status(200).json({ data: quests });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Something went wrong" });
    }
});
exports.getAllTakenQuestsController = getAllTakenQuestsController;
//Get selected takenQuest by id
const getTakenQuestByIdController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const takenQuestsId = req.params.id;
        const selectedTakenQuests = yield DB.read(takenQuestsId);
        if (!selectedTakenQuests) {
            return res.status(404).json({ error: 'Quest not found' });
        }
        return res.status(200).json({ data: selectedTakenQuests });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Something went wrong" });
    }
});
exports.getTakenQuestByIdController = getTakenQuestByIdController;
//Create a takenQuest
const createTakenQuestController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const takenQuestBody = req.body;
        const createTakenQuest = yield DB.create(takenQuestBody);
        return res.status(201).json({ data: createTakenQuest });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: "Something went wrong" });
    }
});
exports.createTakenQuestController = createTakenQuestController;
//modify a quest
const updateTakenQuestController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const takenQuestId = req.params.id;
        const takenQuestBody = req.body;
        const updatedTakenQuest = yield DB.update(takenQuestId, takenQuestBody);
        if (!updatedTakenQuest) {
            return res.status(404).json({ error: 'takenQuest not found' });
        }
        return res.status(201).json({ data: updatedTakenQuest });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Something went wrong" });
    }
});
exports.updateTakenQuestController = updateTakenQuestController;
//delete quest
const deleteTakenQuestController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const takenQuestId = req.params.id;
        const deleteTakendQuest = yield DB.delete(takenQuestId);
        if (!deleteTakendQuest) {
            return res.status(404).json({ error: 'Quest not found' });
        }
        return res.status(200).json({ data: deleteTakendQuest });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: "Something went wrong" });
    }
});
exports.deleteTakenQuestController = deleteTakenQuestController;
//# sourceMappingURL=user_has_quests.controller.js.map