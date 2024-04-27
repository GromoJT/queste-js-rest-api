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
exports.deleteQuestController = exports.updateQuestController = exports.createQuestController = exports.getQuestByIdController = exports.getAllQuestsController = void 0;
const xata_1 = require("../xata");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const xata = (0, xata_1.getXataClient)();
const DB = xata.db.quest;
// Get all quests
const getAllQuestsController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const quests = yield DB.select(["quest_name", "description", "expiration_date", "time_in_h", "user_id_giver.id"]).getAll();
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
exports.getAllQuestsController = getAllQuestsController;
//Get selected quest by id
const getQuestByIdController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const questsId = req.params.id;
        const selectedQuests = yield DB.read(questsId);
        if (!selectedQuests) {
            return res.status(404).json({ error: 'Quest not found' });
        }
        return res.status(200).json({ data: selectedQuests });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Something went wrong" });
    }
});
exports.getQuestByIdController = getQuestByIdController;
//Create a user
const createQuestController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const statusBody = req.body;
        const createStatus = yield DB.create(statusBody);
        return res.status(201).json({ data: createStatus });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: "Something went wrong" });
    }
});
exports.createQuestController = createQuestController;
//modify a quest
const updateQuestController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const questId = req.params.id;
        const questBody = req.body;
        const updatedQuest = yield DB.update(questId, questBody);
        if (!updatedQuest) {
            return res.status(404).json({ error: 'Quest not found' });
        }
        return res.status(201).json({ data: updatedQuest });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Something went wrong" });
    }
});
exports.updateQuestController = updateQuestController;
//delete quest
const deleteQuestController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const questId = req.params.id;
        const deletedQuest = yield DB.delete(questId);
        if (!deletedQuest) {
            return res.status(404).json({ error: 'Quest not found' });
        }
        return res.status(200).json({ data: deletedQuest });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: "Something went wrong" });
    }
});
exports.deleteQuestController = deleteQuestController;
//# sourceMappingURL=quest.controll.js.map