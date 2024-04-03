"use strict";
exports.__esModule = true;
exports.db = exports.dbUtility = exports.dbUtilityClass = exports.pgp = void 0;
var promise = require('bluebird');
var dotenv = require("dotenv");
var options = {
    // Initialization Options
    error: function (error, e) {
        if (e.cn) {
            // A connection-related error;
            console.log('CN:', e.cn);
            console.log('EVENT:', error.message);
        }
    },
    query: function (e) {
        // console.clear();
        console.log(e.query); //called every time a query is executed
    },
    promiseLib: promise,
    capSQL: true
};
exports.pgp = require('pg-promise')(options);
/* part loads the library, and immediately after loading it,
 you're calling it as a function and passing in the options object you just defined */
var dbUtilityClass = /** @class */ (function () {
    function dbUtilityClass() {
        dotenv.config();
    }
    dbUtilityClass.prototype.connect = function () {
        var connection = {
            // host: 'localhost',
            // database: 'testing2',
            // port: 5432,
            // user: 'postgres',
            // password: 'hhs0039i',
            host: process.env.API_DB_HOST,
            database: process.env.API_DB_NAME,
            port: process.env.API_DB_PORT,
            user: process.env.API_DB_USER,
            password: process.env.API_DB_PASSWORD
        };
        var adapter = exports.pgp(connection);
        //const adapter = {};
        return adapter;
    };
    return dbUtilityClass;
}());
exports.dbUtilityClass = dbUtilityClass;
exports.dbUtility = new dbUtilityClass();
exports.db = new dbUtilityClass().connect();
