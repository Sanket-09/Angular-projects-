"use strict";
exports.__esModule = true;
exports.userController = void 0;
var user_repository_1 = require("../repository/user.repository");
var userControllerClass = /** @class */ (function () {
    function userControllerClass() {
    }
    userControllerClass.prototype.getUsers = function (req, res) {
        user_repository_1.userRepository
            .getUsers()
            .then(function (data) {
            //getUsers returns promise
            res.send(data);
        })["catch"](function (error) {
            res.send(error);
        });
    };
    userControllerClass.prototype.getUserById = function (req, res) {
        var id = req.params.id;
        user_repository_1.userRepository
            .getUserById(id)
            .then(function (data) {
            res.send(data);
        })["catch"](function (err) {
            res.send(err);
        });
    };
    userControllerClass.prototype.postUsers = function (req, res) {
        user_repository_1.userRepository
            .addUser(req.body)
            .then(function (data) {
            //getUsers returns promise
            res.send(data);
        })["catch"](function (error) {
            res.send(error);
        });
    };
    userControllerClass.prototype.deleteUserById = function (req, res) {
        var id = req.params.id;
        user_repository_1.userRepository
            .deleteUser(id)
            .then(function (data) {
            //getUsers returns promise
            res.send(data);
        })["catch"](function (error) {
            res.send(error);
        });
    };
    return userControllerClass;
}());
exports.userController = new userControllerClass();
