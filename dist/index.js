"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const status_routes_1 = __importDefault(require("./routes/status.routes"));
const quest_routes_1 = __importDefault(require("./routes/quest.routes"));
const user_has_quest_routes_1 = __importDefault(require("./routes/user_has_quest.routes"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const router = (0, express_1.Router)();
router.use('/auth', auth_routes_1.default);
router.use('/users', user_routes_1.default);
router.use('/status', status_routes_1.default);
router.use('/quests', quest_routes_1.default);
router.use('/taken_quests', user_has_quest_routes_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map