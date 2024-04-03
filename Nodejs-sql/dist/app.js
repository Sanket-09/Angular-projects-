"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const index_router_1 = require("./src/routers/index.router");
class AppClass {
    constructor() {
        this.prisma = new client_1.PrismaClient();
        this.app = express_1.default();
        this._init();
    }
    _init() {
        //configuring dotenv to load the environment variables from the dev.env file located in the ./env/ directory.
        this.app.use(body_parser_1.default.json({ limit: '50mb' }));
        //support application/x-www-form-urlencoded post data
        this.app.use(body_parser_1.default.urlencoded({ extended: false, limit: '50mb' }));
        /* adds another body-parser middleware to parse URL-encoded bodies (like the ones from HTML forms), with a limit of 50mb.
        The extended: false option means that the URL-encoded data will be parsed with the querystring library. */
        // dbUtility.connect()
        this.app.use('/api/v1', index_router_1.baseRouter); //base path
        //Not Found Routers
        this.app.use((req, res, next) => {
            res
                .status(404)
                .json({ message: 'The Requested URL was not found on this server.' });
        });
        this.app.listen(process.env.SERVER_PORT, () => {
            console.log('Express server listening on port', process.env.SERVER_PORT);
        });
    }
}
exports.default = new AppClass().app;
