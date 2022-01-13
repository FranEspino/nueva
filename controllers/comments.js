"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.getComments = exports.postComments = void 0;
var pool = require("../mysql/database");
var postComments = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, id_investigacion, id_persona, comentario, newComment, comment, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, id_investigacion = _a.id_investigacion, id_persona = _a.id_persona, comentario = _a.comentario;
                if (!comentario) {
                    return [2 /*return*/, res.status(400).json({
                            msg: "El comentario es necesario"
                        })];
                }
                newComment = {
                    id_investigacion: id_investigacion,
                    id_persona: id_persona,
                    comentario: comentario,
                    fecha: new Date()
                };
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, pool.query("INSERT INTO comentario SET ?", [
                        newComment,
                    ])];
            case 2:
                comment = _b.sent();
                res.json({ msg: "Comentario guardado", comment: comment });
                return [3 /*break*/, 4];
            case 3:
                error_1 = _b.sent();
                console.log(error_1);
                res.status(500).json({ msg: "Hubo un error" });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.postComments = postComments;
var getComments = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id_investigacion, comments, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id_investigacion = req.query.id_investigacion;
                if (!id_investigacion) {
                    return [2 /*return*/, res.status(400).json({
                            msg: "El id de investigacion es necesario"
                        })];
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, pool.query("SELECT C.id_comentario,C.id_investigacion,C.id_persona,C.comentario, C.fecha, P.nombre, P.apellido,P.dni,P.correo,P.foto  FROM comentario C\n      inner JOIN persona P on C.id_persona= P.id_persona\n       where C.id_investigacion='".concat(id_investigacion, "' order BY(C.fecha) DESC"))];
            case 2:
                comments = _a.sent();
                if (comments.length > 0) {
                    return [2 /*return*/, res.json(comments)];
                }
                res.json({ msg: "No hay comentarios" });
                return [3 /*break*/, 4];
            case 3:
                error_2 = _a.sent();
                console.log(error_2);
                res.status(500).json({ msg: "Hubo un error" });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.getComments = getComments;
//# sourceMappingURL=comments.js.map