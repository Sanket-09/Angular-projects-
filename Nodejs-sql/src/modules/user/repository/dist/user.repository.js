"use strict";
exports.__esModule = true;
exports.userRepository = void 0;
var database_1 = require("../../../utility/database");
var userRepositoryClass = /** @class */ (function () {
    function userRepositoryClass() {
    }
    userRepositoryClass.prototype.getUsers = function () {
        var dbPromise = new Promise(function (resolve, reject) {
            try {
                database_1.db.any('Select * from public.cars')
                    .then(function (data) {
                    resolve(data);
                }) //if db is connected and some error
                ["catch"](function (error) {
                    reject(error);
                });
            }
            catch (e) {
                //if db is not connected then error
                reject(e);
            }
        });
        return dbPromise; //returns a promise
    };
    userRepositoryClass.prototype.getUserById = function (id) {
        var dbPromise = new Promise(function (resolve, reject) {
            try {
                var query = "SELECT * from public.cars where id = " + id;
                database_1.db.any(query)
                    .then(function (res) {
                    if (res.length === 0) {
                        reject({ message: "Car with ID: " + id + " does not exist." });
                    }
                    else {
                        resolve(res);
                    }
                })["catch"](function (err) { return reject(err); });
            }
            catch (e) {
                reject(e);
            }
        });
        return dbPromise;
    };
    userRepositoryClass.prototype.addUser = function (addBody) {
        var brand = addBody.brand, model = addBody.model, year = addBody.year;
        var dbPromise = new Promise(function (resolve, reject) {
            try {
                database_1.db.any('INSERT INTO public.cars VALUES($1,$2,$3) RETURNING *', [
                    brand,
                    model,
                    year,
                ])
                    .then(function (data) {
                    resolve(data);
                }) //if db is connected and some error
                ["catch"](function (error) {
                    reject(error);
                });
            }
            catch (e) {
                //if db is not connected then error
                reject(e);
            }
        });
        return dbPromise; //returns a promise
    };
    userRepositoryClass.prototype.deleteUser = function (idToDelete) {
        var dbPromise = new Promise(function (resolve, reject) {
            try {
                database_1.db.result("DELETE FROM public.cars WHERE id = " + idToDelete) // Consider using parameterized queries to prevent SQL injection
                    .then(function (result) {
                    if (result.rowCount === 0) {
                        reject({ message: "Car with ID: " + idToDelete + " does not exist." });
                    }
                    else {
                        resolve({
                            message: "Car with ID: " + idToDelete + " has been deleted."
                        });
                    }
                })["catch"](function (error) {
                    reject(error);
                });
            }
            catch (e) {
                reject(e);
            }
        });
        return dbPromise;
    };
    return userRepositoryClass;
}());
exports.userRepository = new userRepositoryClass();
