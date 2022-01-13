"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var server_1 = __importDefault(require("./server/server"));
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1["default"].config();
var server = new server_1["default"]();
server.listen();
//# sourceMappingURL=App.js.map