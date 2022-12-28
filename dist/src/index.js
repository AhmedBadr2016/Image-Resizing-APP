"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var myroute_1 = __importDefault(require("./routes/myroute"));
var port = 3000;
var App = (0, express_1.default)();
// use my main route "index"
App.use('/images', myroute_1.default);
App.listen(port, function () {
    // listen to the local host at port: 3000
    console.log("http://localhost:3000/images?filename=");
});
exports.default = App;
