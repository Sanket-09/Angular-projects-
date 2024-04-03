"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.baseRouter = exports.baseRouterClass = void 0;
const express_1 = __importDefault(require("express"));
const user_router_1 = require("../modules/user/user.router");
class baseRouterClass {
    constructor() {
        this.router = express_1.default.Router();
        this.config();
    }
    config() {
        this.router.use("/user", user_router_1.userRouter);
    }
}
exports.baseRouterClass = baseRouterClass;
exports.baseRouter = new baseRouterClass().router;
//# sourceMappingURL=index.router.js.map