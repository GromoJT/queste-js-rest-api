"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
const router = (0, express_1.Router)();
//Get selected quest
router.get('/', auth_controller_1.getUserPassController);
//Create a quest
router.post('/', auth_controller_1.getUserPassController);
exports.default = router;
//# sourceMappingURL=auth.routes.js.map