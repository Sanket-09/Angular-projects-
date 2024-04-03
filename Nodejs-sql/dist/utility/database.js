"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = exports.dbUtility = exports.dbUtilityClass = exports.pgp = void 0;
const promise = require('bluebird');
const options = {
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
    capSQL: true, // if you want all generated SQL capitalized
};
exports.pgp = require('pg-promise')(options);
/* part loads the library, and immediately after loading it,
 you're calling it as a function and passing in the options object you just defined */
class dbUtilityClass {
    constructor() { }
    connect() {
        const connection = {
            host: 'localhost',
            database: 'testing2',
            port: 5432,
            user: 'postgres',
            password: 'hhs0039i',
        };
        const adapter = (0, exports.pgp)(connection);
        //const adapter = {};
        return adapter;
    }
}
exports.dbUtilityClass = dbUtilityClass;
exports.dbUtility = new dbUtilityClass();
exports.db = new dbUtilityClass().connect();
//# sourceMappingURL=database.js.map