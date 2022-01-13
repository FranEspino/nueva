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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.login = void 0;
var bcryptjs_1 = __importDefault(require("bcryptjs"));
var pool = require("../mysql/database");
var login = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, dni, clave, usuario, validPassword, id_persona, persona, rol, rol_1, e_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, dni = _a.dni, clave = _a.clave;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 8, , 9]);
                if (!dni || !clave) {
                    return [2 /*return*/, res.status(409).json({ msg: "faltan datos" })];
                }
                return [4 /*yield*/, pool.query("SELECT *FROM usuario where dni=".concat(dni))];
            case 2:
                usuario = _b.sent();
                validPassword = bcryptjs_1["default"].compareSync(clave, usuario[0].clave);
                if (!validPassword) {
                    return [2 /*return*/, res.status(400).json({
                            msg: "Usuario /password no son correctos - password"
                        })];
                }
                id_persona = usuario[0].id_persona;
                return [4 /*yield*/, pool.query("SELECT *FROM persona where id_persona=\"".concat(id_persona, "\""))];
            case 3:
                persona = _b.sent();
                return [4 /*yield*/, pool.query("SELECT * from investigador where id_persona=".concat(persona[0].id_persona))];
            case 4:
                rol = _b.sent();
                if (!(rol.length > 0)) return [3 /*break*/, 5];
                return [2 /*return*/, res.json({
                        persona: persona,
                        rol: {
                            tipo: "investigador",
                            id_rol: rol[0].id_investigador
                        }
                    })];
            case 5: return [4 /*yield*/, pool.query("SELECT * from asesor  where id_persona=".concat(persona[0].id_persona))];
            case 6:
                rol_1 = _b.sent();
                if (rol_1.length > 0) {
                    return [2 /*return*/, res.json({
                            persona: persona,
                            rol: {
                                tipo: "asesor",
                                id_rol: rol_1[0].id_asesor
                            }
                        })];
                }
                _b.label = 7;
            case 7:
                res.json({
                    persona: persona,
                    rol: {
                        tipo: "administrador"
                    }
                });
                return [3 /*break*/, 9];
            case 8:
                e_1 = _b.sent();
                console.log(e_1);
                res.status(500).json({ msg: "No se pudo autentificar" });
                return [3 /*break*/, 9];
            case 9: return [2 /*return*/];
        }
    });
}); };
exports.login = login;
//# sourceMappingURL=login.js.map