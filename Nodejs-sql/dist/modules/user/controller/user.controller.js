"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const user_repository_1 = require("../repository/user.repository");
class userControllerClass {
    constructor() { }
    getUsers(req, res) {
        user_repository_1.userRepository
            .getUsers()
            .then((data) => {
            //getUsers returns promise
            res.send(data);
        })
            .catch((error) => {
            res.send(error);
        });
    }
    getUserById(req, res) {
        let id = req.params.id;
        user_repository_1.userRepository
            .getUserById(id)
            .then((data) => {
            res.send(data);
        })
            .catch((err) => {
            res.send(err);
        });
    }
}
exports.userController = new userControllerClass();
//# sourceMappingURL=user.controller.js.map