"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const status_controller_1 = require("../controllers/status.controller");
const router = (0, express_1.Router)();
// Get all statuses
router.get('/', status_controller_1.getAllStatusesController);
//Get selected status
router.get('/:id', status_controller_1.getStatusByIdController);
//Create a status
router.post('/', status_controller_1.createStatusController);
//modify a status
router.put('/:id', status_controller_1.updateStatusController);
//delete status
router.delete('/:id', status_controller_1.deleteStatusController);
exports.default = router;
//# sourceMappingURL=status.routes.js.map