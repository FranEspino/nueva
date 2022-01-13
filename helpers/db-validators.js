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
exports.validPerson = exports.existsInvestigation = exports.existsAsesor = exports.existsInvestigator = exports.existsRole = exports.existsPerson = void 0;
var pool = require("../mysql/database");
var existsPerson = function (dni) { return __awaiter(void 0, void 0, void 0, function () {
    var dataPerson;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, pool.query("SELECT * FROM persona WHERE dni = ?", [
                    dni,
                ])];
            case 1:
                dataPerson = _a.sent();
                if ((dataPerson === null || dataPerson === void 0 ? void 0 : dataPerson.length) > 0) {
                    throw new Error("La persona ya existe");
                }
                return [2 /*return*/];
        }
    });
}); };
exports.existsPerson = existsPerson;
var existsRole = function (tipo_usuario) { return __awaiter(void 0, void 0, void 0, function () {
    var dataRoles;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                tipo_usuario = tipo_usuario.toUpperCase();
                return [4 /*yield*/, pool.query("SELECT * FROM tipo_cuenta WHERE nombre = ?", [tipo_usuario])];
            case 1:
                dataRoles = _a.sent();
                if ((dataRoles === null || dataRoles === void 0 ? void 0 : dataRoles.length) === 0) {
                    throw new Error("El Rol no existe");
                }
                return [2 /*return*/];
        }
    });
}); };
exports.existsRole = existsRole;
var existsInvestigator = function (idInvestigador) { return __awaiter(void 0, void 0, void 0, function () {
    var dataInvestigator;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, pool.query("SELECT * FROM investigador WHERE id_investigador=".concat(idInvestigador))];
            case 1:
                dataInvestigator = _a.sent();
                if ((dataInvestigator === null || dataInvestigator === void 0 ? void 0 : dataInvestigator.length) === 0) {
                    throw new Error("El investigador no existe");
                }
                return [2 /*return*/];
        }
    });
}); };
exports.existsInvestigator = existsInvestigator;
var existsAsesor = function (idAsesor) { return __awaiter(void 0, void 0, void 0, function () {
    var dataAsesor;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, pool.query("SELECT * FROM asesor WHERE id_asesor=".concat(idAsesor))];
            case 1:
                dataAsesor = _a.sent();
                if ((dataAsesor === null || dataAsesor === void 0 ? void 0 : dataAsesor.length) === 0) {
                    throw new Error("El asesor no existe");
                }
                return [2 /*return*/];
        }
    });
}); };
exports.existsAsesor = existsAsesor;
var existsInvestigation = function (idInvestigacion) { return __awaiter(void 0, void 0, void 0, function () {
    var dataInvestigation;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, pool.query("SELECT * FROM investigacion WHERE id_investigacion=".concat(idInvestigacion))];
            case 1:
                dataInvestigation = _a.sent();
                if ((dataInvestigation === null || dataInvestigation === void 0 ? void 0 : dataInvestigation.length) === 0) {
                    throw new Error("La investigacion no existe");
                }
                return [2 /*return*/];
        }
    });
}); };
exports.existsInvestigation = existsInvestigation;
var validPerson = function (idPerson) { return __awaiter(void 0, void 0, void 0, function () {
    var dataPerson;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, pool.query("SELECT * FROM persona WHERE id_persona=".concat(idPerson))];
            case 1:
                dataPerson = _a.sent();
                if ((dataPerson === null || dataPerson === void 0 ? void 0 : dataPerson.length) === 0) {
                    throw new Error("La persona no existe");
                }
                return [2 /*return*/];
        }
    });
}); };
exports.validPerson = validPerson;
//# sourceMappingURL=db-validators.js.map