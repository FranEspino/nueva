"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var path_1 = __importDefault(require("path"));
var cors_1 = __importDefault(require("cors"));
var auth_1 = __importDefault(require("../routes/auth"));
var users_1 = __importDefault(require("../routes/users"));
var investigation_1 = __importDefault(require("../routes/investigation"));
var files_1 = __importDefault(require("../routes/files"));
var comments_1 = __importDefault(require("../routes/comments"));
var cites_1 = __importDefault(require("../routes/cites"));
var myParser = require("body-parser");
var Server = /** @class */ (function () {
    function Server() {
        this.apiPaths = {
            login: "/api/login",
            users: "/api/usuarios",
            investigation: "/api/investigacion",
            documents: "/api/file",
            comment: "/api/comentario",
            cites: "/api/cita"
        };
        this.app = (0, express_1["default"])();
        this.port = process.env.PORT || "8080";
        this.middleware();
        this.routes();
    }
    Server.prototype.middleware = function () {
        this.app.use((0, cors_1["default"])());
        this.app.use(express_1["default"].static(path_1["default"].join(__dirname, "../public")));
        this.app.use(express_1["default"].static("public"));
        //  this.app.use(express.json());
        this.app.use(myParser.json({ limit: '200mb' }));
        this.app.use(myParser.urlencoded({ limit: '200mb', extended: true }));
        //  this.app.use(myParser.text({ limit: "200mb" }));
        // this.app.use(myParser.urlencoded({ limit: "200mb", extended: true }));
    };
    Server.prototype.routes = function () {
        this.app.use(this.apiPaths.login, auth_1["default"]);
        this.app.use(this.apiPaths.users, users_1["default"]);
        this.app.use(this.apiPaths.investigation, investigation_1["default"]);
        this.app.use(this.apiPaths.documents, files_1["default"]);
        this.app.use(this.apiPaths.comment, comments_1["default"]);
        this.app.use(this.apiPaths.cites, cites_1["default"]);
    };
    Server.prototype.listen = function () {
        var _this = this;
        this.app.listen(this.port, function () {
            console.log("Server runing in: " + _this.port);
        });
    };
    return Server;
}());
exports["default"] = Server;
//# sourceMappingURL=server.js.map