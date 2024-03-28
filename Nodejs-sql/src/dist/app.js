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
        this.app.use(body_parser_1["default"].json({ limit: '50mb' }));
        //support application/x-www-form-urlencoded post data
        this.app.use(body_parser_1["default"].urlencoded({ extended: false, limit: '50mb' }));
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
