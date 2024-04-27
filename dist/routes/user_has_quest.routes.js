"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_has_quests_controller_1 = require("../controllers/user_has_quests.controller");
const router = (0, express_1.Router)();
// Get all taken_quests
router.get('/', user_has_quests_controller_1.getAllTakenQuestsController);
//Get selected taken_quest
router.get('/:id', user_has_quests_controller_1.getTakenQuestByIdController);
//Create a taken_quest
router.post('/', user_has_quests_controller_1.createTakenQuestController);
//modify a taken_quests
router.put('/:id', user_has_quests_controller_1.updateTakenQuestController);
//delete taken_quest
router.delete('/:id', user_has_quests_controller_1.deleteTakenQuestController);
exports.default = router;
//# sourceMappingURL=user_has_quest.routes.js.map