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
exports.putCites = exports.getCites = exports.postCites = void 0;
var pool = require("../mysql/database");
//	id_cita	id_investigacion	titulo	descripcion	fecha	hora	link
var postCites = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, id_investigacion, titulo, descripcion, fecha, hora, link, investigacion, newCite, cite, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, id_investigacion = _a.id_investigacion, titulo = _a.titulo, descripcion = _a.descripcion, fecha = _a.fecha, hora = _a.hora, link = _a.link;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 8, , 9]);
                if (!(id_investigacion && titulo && descripcion && fecha && hora && link)) return [3 /*break*/, 6];
                return [4 /*yield*/, pool.query("SELECT * from investigacion where id_investigacion=".concat(id_investigacion))];
            case 2:
                investigacion = _b.sent();
                if (!(investigacion.length > 0)) return [3 /*break*/, 4];
                newCite = {
                    id_investigacion: id_investigacion,
                    titulo: titulo,
                    descripcion: descripcion,
                    fecha: fecha,
                    hora: hora,
                    link: link
                };
                return [4 /*yield*/, pool.query("INSERT INTO cita set ?", [newCite])];
            case 3:
                cite = _b.sent();
                res.json({ msg: "Cita guardada", cite: cite });
                return [3 /*break*/, 5];
            case 4:
                res.status(401).json({ msg: "Investigacion no existe" });
                _b.label = 5;
            case 5: return [3 /*break*/, 7];
            case 6:
                res.status(401).json({ msg: "Faltan datos" });
                _b.label = 7;
            case 7: return [3 /*break*/, 9];
            case 8:
                error_1 = _b.sent();
                res.status(500).json({ msg: "Error al guardar cita" });
                return [3 /*break*/, 9];
            case 9: return [2 /*return*/];
        }
    });
}); };
exports.postCites = postCites;
var getCites = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id_investigacion, cites, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id_investigacion = req.query.id_investigacion;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 5, , 6]);
                if (!id_investigacion) return [3 /*break*/, 3];
                return [4 /*yield*/, pool.query("SELECT * from cita where id_investigacion=".concat(id_investigacion))];
            case 2:
                cites = _a.sent();
                if (cites.length > 0) {
                    res.json({ cites: cites });
                }
                else {
                    res.status(401).json({ msg: "No hay citas" });
                }
                return [3 /*break*/, 4];
            case 3:
                res.status(401).json({ msg: "Faltan datos" });
                _a.label = 4;
            case 4: return [3 /*break*/, 6];
            case 5:
                error_2 = _a.sent();
                res.status(500).json({ msg: "Error al consultar citas" });
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.getCites = getCites;
var putCites = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, id_cita, id_investigacion, titulo, descripcion, fecha, hora, link, cite, cite_1, error_3;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, id_cita = _a.id_cita, id_investigacion = _a.id_investigacion, titulo = _a.titulo, descripcion = _a.descripcion, fecha = _a.fecha, hora = _a.hora, link = _a.link;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 8, , 9]);
                if (!(id_cita &&
                    id_investigacion &&
                    titulo &&
                    descripcion &&
                    fecha &&
                    hora &&
                    link)) return [3 /*break*/, 6];
                return [4 /*yield*/, pool.query("SELECT * from cita where id_cita=".concat(id_cita))];
            case 2:
                cite = _b.sent();
                if (!(cite.length > 0)) return [3 /*break*/, 4];
                return [4 /*yield*/, pool.query("\n          UPDATE cita  set   id_investigacion=".concat(id_investigacion, ",\n                titulo='").concat(titulo, "',\n                descripcion='").concat(descripcion, "',\n                fecha='").concat(fecha, "',\n                hora='").concat(hora, "',\n                link='").concat(link, "'\n                WHERE id_cita =").concat(id_cita))];
            case 3:
                cite_1 = _b.sent();
                //   console.log(req.body, "cita", cite);
                res.json({ msg: "Cita actualizada", cite: cite_1 });
                return [3 /*break*/, 5];
            case 4:
                res.status(401).json({ msg: "Cita no existe" });
                _b.label = 5;
            case 5: return [3 /*break*/, 7];
            case 6:
                res.status(401).json({ msg: "Faltan datos" });
                _b.label = 7;
            case 7: return [3 /*break*/, 9];
            case 8:
                error_3 = _b.sent();
                console.log(error_3);
                res.status(500).json({ msg: "Error al actualizar cita" });
                return [3 /*break*/, 9];
            case 9: return [2 /*return*/];
        }
    });
}); };
exports.putCites = putCites;
//# sourceMappingURL=cites.js.map