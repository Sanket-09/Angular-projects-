"use strict";
exports.__esModule = true;
var body_parser_1 = require("body-parser");
var express_1 = require("express");
var dotenv = require("dotenv");
var index_router_1 = require("./routers/index.router");
var AppClass = /** @class */ (function () {
    function AppClass() {
        this.app = express_1["default"]();
        this._init();
    }
    AppClass.prototype._init = function () {
        dotenv.config({ path: './env/' + 'dev.env' });
        //configuring dotenv to load the environment variables from the dev.env file located in the ./env/ directory.
        this.app.use(body_parser_1["default"].json({ limit: '50mb' }));
        //support application/x-www-form-urlencoded post data
        this.app.use(body_parser_1["default"].urlencoded({ extended: false, limit: '50mb' }));
        /* adds another body-parser middleware to parse URL-encoded bodies (like the ones from HTML forms), with a limit of 50mb.
        The extended: false option means that the URL-encoded data will be parsed with the querystring library. */
        // dbUtility.connect()
        this.app.use('/api/v1', index_router_1.baseRouter);
        //Not Found Routers
        this.app.use(function (req, res, next) {
            res
                .status(404)
                .send({ message: 'The Requested URL was not found on this server.' });
        });
        this.app.listen(process.env.PORT, function () {
            console.log('Express server listening on port ' + process.env.PORT);
        });
    };
    return AppClass;
}());
exports["default"] = new AppClass().app;
