"use strict";
exports.__esModule = true;
exports.baseRouter = exports.baseRouterClass = void 0;
var express_1 = require("express");
var user_router_1 = require("../modules/user/user.router");
var baseRouterClass = /** @class */ (function () {
    function baseRouterClass() {
        this.router = express_1["default"].Router();
        this.config(); //basically express.config()
    }
    baseRouterClass.prototype.config = function () {
        this.router.use('/user', user_router_1.userRouter);
    };
    return baseRouterClass;
}());
exports.baseRouterClass = baseRouterClass;
exports.baseRouter = new baseRouterClass().router;
