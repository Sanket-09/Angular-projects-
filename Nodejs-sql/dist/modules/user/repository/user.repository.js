"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRepository = void 0;
const database_1 = require("../../../utility/database");
class userRepositoryClass {
    getUsers() {
        let dbPromise = new Promise((resolve, reject) => {
            try {
                database_1.db.any('Select * from k_arogia_s.users')
                    .then((data) => {
                    resolve(data);
                }) //if db is connected and some error
                    .catch((error) => {
                    reject(error);
                });
            }
            catch (e) {
                //if db is not connected then error
                reject(e);
            }
        });
        return dbPromise; //returns a promise
    }
    getUserById(id) {
        let dbPromise = new Promise((resolve, reject) => {
            try {
                let query = `SELECT * from k_arogia_s.users where id = ${id}`;
                database_1.db.any(query)
                    .then((res) => resolve(res))
                    .catch((err) => reject(err));
            }
            catch (e) {
                reject(e);
            }
        });
        return dbPromise;
    }
}
exports.userRepository = new userRepositoryClass();
//# sourceMappingURL=user.repository.js.map