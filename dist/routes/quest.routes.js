"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const quest_controll_1 = require("../controllers/quest.controll");
const router = (0, express_1.Router)();
// Get all quests
router.get('/', quest_controll_1.getAllQuestsController);
//Get selected quest
router.get('/:id', quest_controll_1.getQuestByIdController);
//Create a quest
router.post('/', quest_controll_1.createQuestController);
//modify a quest
router.put('/:id', quest_controll_1.updateQuestController);
//delete quest
router.delete('/:id', quest_controll_1.deleteQuestController);
exports.default = router;
//# sourceMappingURL=quest.routes.js.map