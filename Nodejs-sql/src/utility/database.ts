const promise = require('bluebird');

const options = {
    // Initialization Options
    error: function (error:any, e:any) {
        if (e.cn) {
            // A connection-related error;
            console.log("CN:", e.cn);
            console.log("EVENT:", error.message);
        }
    },
    query: function (e:any) {
        // console.clear();
        console.log(e.query);
    },

    promiseLib: promise,
    capSQL: true // if you want all generated SQL capitalized
};

export const pgp = require('pg-promise')(options);

export class dbUtilityClass {

    constructor() {
    }

    public connect(): any {

        const connection = {
            host: process.env.API_DB_HOST,
            database: process.env.API_DB_NAME,
            port: process.env.API_DB_PORT,
            user: process.env.API_DB_USER,
            password: process.env.API_DB_PASSWORD
        };

        const adapter = pgp(connection);

        //const adapter = {};
        return adapter;
    }
}

export const dbUtility = new dbUtilityClass();
export const db = new dbUtilityClass().connect();