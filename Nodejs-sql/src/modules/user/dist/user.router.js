"use strict";
exports.__esModule = true;
exports.userRouter = exports.userRouterClass = void 0;
var express = require("express");
var user_controller_1 = require("./controller/user.controller");
var userRouterClass = /** @class */ (function () {
    function userRouterClass() {
        this.router = express.Router();
        this.config();
    }
    userRouterClass.prototype.config = function () {
        this.router.get('/', user_controller_1.userController.getUsers);
        this.router.post('/', user_controller_1.userController.postUsers);
        this.router.get('/:id', user_controller_1.userController.getUserById);
        this.router["delete"]('/:id', user_controller_1.userController.deleteUserById);
    };
    return userRouterClass;
}());
exports.userRouterClass = userRouterClass;
exports.userRouter = new userRouterClass().router;
