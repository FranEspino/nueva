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
exports.putDetalleInvestigacion = exports.getDetalleHistorial = exports.putInvestigations = exports.getInvestigations = exports.putArchivo64 = exports.putArchivo = exports.postInvestigation = void 0;
var path_1 = __importDefault(require("path"));
var fs_1 = __importDefault(require("fs"));
var pool = require("../mysql/database");
var postInvestigation = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, id_investigador, url_archivo, titulo, descripcion, fecha_inicio, id_asesor, investigation, directory, newInvestigation, investigacion, newDetalleInvestigation, detalleInvestigation, e_1;
    var _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _a = req.body, id_investigador = _a.id_investigador, url_archivo = _a.url_archivo, titulo = _a.titulo, descripcion = _a.descripcion, fecha_inicio = _a.fecha_inicio, id_asesor = _a.id_asesor;
                _c.label = 1;
            case 1:
                _c.trys.push([1, 6, , 7]);
                if (!req.file) {
                    return [2 /*return*/, res.status(400).json({
                            msg: "Solo se aceptan archivos pdf"
                        })];
                }
                return [4 /*yield*/, pool.query("SELECT * from investigacion where id_investigacion=".concat(id_investigador))];
            case 2:
                investigation = _c.sent();
                if (investigation.length > 0) {
                    directory = path_1["default"].join(__dirname, "../documents/" + req.body.document);
                    fs_1["default"].unlinkSync(directory);
                    return [2 /*return*/, res.status(400).json({
                            msg: "Ya cuenta con una investigacion"
                        })];
                }
                url_archivo = req.body.document;
                console.log("url_archivo:", url_archivo);
                url_archivo = url_archivo.substring(0, url_archivo.length - 4);
                console.log(url_archivo);
                return [4 /*yield*/, fs_1["default"].readFileSync(path_1["default"].join(__dirname, "../documents/" + ((_b = req.file) === null || _b === void 0 ? void 0 : _b.filename)))];
            case 3:
                _c.sent();
                newInvestigation = {
                    id_investigador: id_investigador,
                    url_archivo: url_archivo,
                    titulo: titulo,
                    descripcion: descripcion,
                    fecha_inicio: fecha_inicio
                };
                return [4 /*yield*/, pool.query("INSERT INTO investigacion set ?", [
                        newInvestigation,
                    ])];
            case 4:
                investigacion = _c.sent();
                newDetalleInvestigation = {
                    id_investigacion: investigacion.insertId,
                    id_asesor: id_asesor,
                    estado: "Por revisar",
                    comentario: "",
                    avance: "0"
                };
                return [4 /*yield*/, pool.query("INSERT INTO detalle_investigacion set ?", [newDetalleInvestigation])];
            case 5:
                detalleInvestigation = _c.sent();
                res.json({ investigacion: investigacion, detalleInvestigation: detalleInvestigation });
                return [3 /*break*/, 7];
            case 6:
                e_1 = _c.sent();
                console.log(e_1);
                res.status(500).json({ msg: "Error al crear investigacion" });
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); };
exports.postInvestigation = postInvestigation;
var putArchivo = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id_investigacion, url_archivo, investigation, directory, e_2, directory;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 5, , 6]);
                id_investigacion = req.params.id_investigacion;
                // console.log("id_investigacion:", req);
                if (!req.file) {
                    return [2 /*return*/, res.status(400).json({
                            msg: "Solo se aceptan archivos pdf"
                        })];
                }
                url_archivo = req.body.document;
                url_archivo = url_archivo.substring(0, url_archivo.length - 4);
                return [4 /*yield*/, pool.query("SELECT * FROM investigacion WHERE id_investigacion = ".concat(id_investigacion))];
            case 1:
                investigation = _a.sent();
                if (!(investigation.length > 0)) return [3 /*break*/, 3];
                return [4 /*yield*/, pool.query("UPDATE investigacion SET url_archivo = '".concat(url_archivo, "' \n          WHERE id_investigacion = ").concat(id_investigacion))];
            case 2:
                _a.sent();
                return [2 /*return*/, res.json({ msg: "archivo actualizado", investigation: investigation })];
            case 3:
                directory = path_1["default"].join(__dirname, "../documents/" + req.body.document);
                fs_1["default"].unlinkSync(directory);
                return [2 /*return*/, res.status(404).json({ msg: "investigacion no encontrada" })];
            case 4: return [3 /*break*/, 6];
            case 5:
                e_2 = _a.sent();
                console.log(e_2);
                directory = path_1["default"].join(__dirname, "../documents/" + req.body.document);
                fs_1["default"].unlinkSync(directory);
                res.status(500).json({ msg: "Error al guardar el archivo" });
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.putArchivo = putArchivo;
var putArchivo64 = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, documents, id_investigacion, investigation, tituloInvestigacion, directory_1, extension, directory, e_3;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, documents = _a.documents, id_investigacion = _a.id_investigacion;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 6, , 7]);
                return [4 /*yield*/, pool.query("select * from investigacion where id_investigacion=".concat(id_investigacion))];
            case 2:
                investigation = _b.sent();
                if (!(investigation.length > 0)) return [3 /*break*/, 5];
                tituloInvestigacion = investigation[0].titulo;
                if (investigation[0].url_archivo !== "" &&
                    investigation[0].url_archivo !== null &&
                    investigation[0].url_archivo !== undefined) {
                    if (fs_1["default"].existsSync(path_1["default"].join(__dirname, "../documents/" + investigation[0].url_archivo + ".pdf"))) {
                        directory_1 = path_1["default"].join(__dirname, "../documents/" + investigation[0].url_archivo + ".pdf");
                        fs_1["default"].unlinkSync(directory_1);
                    }
                }
                extension = Date.now() + "-document-" + "".concat(tituloInvestigacion, "archivo");
                directory = path_1["default"].join(__dirname, "../documents/".concat(extension));
                fs_1["default"].writeFile("".concat(directory, ".pdf"), documents, { encoding: "base64" }, function (err) {
                    if (err) {
                        console.log(err);
                        return res.status(500).json({ msg: "Error al guardar el archivo" });
                    }
                });
                console.log("archivo guardado");
                return [4 /*yield*/, pool.query("UPDATE investigacion SET url_archivo = '".concat(extension, "' \n      WHERE id_investigacion = ").concat(id_investigacion))];
            case 3:
                _b.sent();
                return [4 /*yield*/, pool.query("UPDATE detalle_investigacion \n      SET estado = 'por revisar' WHERE id_investigacion = ".concat(id_investigacion))];
            case 4:
                _b.sent();
                return [2 /*return*/, res.json({ msg: "archivo actualizado" })];
            case 5: return [2 /*return*/, res.json({ msg: "no se pudo actualizar" })];
            case 6:
                e_3 = _b.sent();
                console.log(e_3);
                res.status(500).json({ msg: "Error al guardar el archivo" });
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); };
exports.putArchivo64 = putArchivo64;
var getInvestigations = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, id_investigador, id_asesor, id_admin, investigacion, investigacion, investigacion, e_4;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.query, id_investigador = _a.id_investigador, id_asesor = _a.id_asesor, id_admin = _a.id_admin;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 8, , 9]);
                if (!id_investigador) return [3 /*break*/, 3];
                return [4 /*yield*/, pool.query("select inv.id_investigacion,inv.url_archivo,inv.titulo,inv.descripcion,inv.fecha_inicio,dtinv.estado,dtinv.avance,ase.id_asesor as 'id_rol',\n        per.nombre,per.apellido,per.foto, per.correo, per.telefono from investigacion inv \n        inner join detalle_investigacion as dtinv on \n            inv.id_investigacion=dtinv.id_investigacion\n            inner join asesor as ase on dtinv.id_asesor= ase.id_asesor\n            inner join persona as per on ase.id_persona=per.id_persona\n             where id_investigador = ".concat(id_investigador, " "))];
            case 2:
                investigacion = _b.sent();
                return [2 /*return*/, res.json({ investigacion: investigacion })];
            case 3:
                if (!id_asesor) return [3 /*break*/, 5];
                return [4 /*yield*/, pool.query("select  inv.id_investigacion,inv.url_archivo,inv.titulo,inv.descripcion,inv.fecha_inicio,dtinv.estado,dtinv.avance,itg.id_investigador  as 'id_rol',\n        per.nombre,per.apellido,per.foto, per.correo, per.telefono from investigacion inv \n        inner join detalle_investigacion as dtinv on \n            inv.id_investigacion = dtinv.id_investigacion\n            inner join investigador as itg on itg.id_investigador=  inv.id_investigador\n            inner join persona as per on itg.id_persona=per.id_persona\n            where id_asesor = ".concat(id_asesor))];
            case 4:
                investigacion = _b.sent();
                return [2 /*return*/, res.json({ investigacion: investigacion })];
            case 5:
                if (!id_admin) return [3 /*break*/, 7];
                return [4 /*yield*/, pool.query("SELECT INV.id_investigacion,INV.url_archivo, INV.titulo, DI.estado, DI.avance, CONCAT(P1.nombre,\" \",P1.apellido) as nombres_investigador,  CONCAT(P2.nombre,\" \",P2.apellido) as nombres_asesor\n        FROM investigacion INV \n            INNER JOIN investigador I \n              ON I.id_investigador = INV.id_investigador\n              INNER JOIN persona P1 \n                ON P1.id_persona = I.id_persona\n            INNER JOIN detalle_investigacion DI \n                ON DI.id_investigacion = INV.id_investigacion \n              INNER JOIN asesor A \n                ON A.id_asesor = DI.id_asesor\n               INNER JOIN persona P2 \n                ON P2.id_persona = A.id_persona")];
            case 6:
                investigacion = _b.sent();
                return [2 /*return*/, res.json({ investigacion: investigacion })];
            case 7:
                res.status(400).json({ msg: "se requiere datos" });
                return [3 /*break*/, 9];
            case 8:
                e_4 = _b.sent();
                console.log(e_4);
                res.status(500).json({ msg: "Error " });
                return [3 /*break*/, 9];
            case 9: return [2 /*return*/];
        }
    });
}); };
exports.getInvestigations = getInvestigations;
var putInvestigations = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, id_investigacion, url_archivo, titulo, descripcion, investigation, directory, investigacion, e_5;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, id_investigacion = _a.id_investigacion, url_archivo = _a.url_archivo, titulo = _a.titulo, descripcion = _a.descripcion;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 5, , 6]);
                if (!id_investigacion) return [3 /*break*/, 4];
                console.log("id_investigacion", id_investigacion);
                return [4 /*yield*/, pool.query("SELECT * FROM   investigacion where id_investigacion=".concat(id_investigacion, "  "))];
            case 2:
                investigation = _b.sent();
                if (!(investigation.length > 0)) return [3 /*break*/, 4];
                if (req.file) {
                    directory = path_1["default"].join(__dirname, "../documents/" + investigation[0].url_archivo + ".pdf");
                    console.log("url_archivo:", url_archivo);
                    fs_1["default"].unlinkSync(directory);
                    url_archivo = req.body.document;
                    url_archivo = url_archivo.substring(0, url_archivo.length - 4);
                }
                else {
                    url_archivo = investigation[0].url_archivo;
                }
                return [4 /*yield*/, pool.query("UPDATE investigacion SET url_archivo = '".concat(url_archivo, "', titulo = '").concat(titulo, "', descripcion = '").concat(descripcion, "' WHERE id_investigacion = ").concat(id_investigacion))];
            case 3:
                investigacion = _b.sent();
                return [2 /*return*/, res.json({ investigacion: investigacion })];
            case 4:
                res.status(400).json({ msg: "se requiere datos" });
                return [3 /*break*/, 6];
            case 5:
                e_5 = _b.sent();
                console.log(e_5);
                res.status(500).json({ msg: "Error " });
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.putInvestigations = putInvestigations;
var getDetalleHistorial = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id_investigacion, detalleHistorial, e_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log(req.params);
                id_investigacion = req.params.id_investigacion;
                console.log("id_investigacion", id_investigacion);
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, pool.query("SELECT * FROM historial WHERE id_investigacion=".concat(id_investigacion))];
            case 2:
                detalleHistorial = _a.sent();
                return [2 /*return*/, res.json({ detalleHistorial: detalleHistorial })];
            case 3:
                e_6 = _a.sent();
                res.status(500).json({ msg: "Error " });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.getDetalleHistorial = getDetalleHistorial;
var putDetalleInvestigacion = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, id_investigacion, estado, avance, comentario, detalleInvestigation, investigacion, e_7;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, id_investigacion = _a.id_investigacion, estado = _a.estado, avance = _a.avance, comentario = _a.comentario;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 5, , 6]);
                if (avance > 100) {
                    return [2 /*return*/, res
                            .status(400)
                            .json({ msg: "el avance no puede ser mayor a 100" })];
                }
                if (!(id_investigacion && estado && avance)) return [3 /*break*/, 4];
                return [4 /*yield*/, pool.query("SELECT * FROM   detalle_investigacion where id_investigacion=".concat(id_investigacion, "  "))];
            case 2:
                detalleInvestigation = _b.sent();
                if (!(detalleInvestigation.length > 0)) return [3 /*break*/, 4];
                return [4 /*yield*/, pool.query("UPDATE detalle_investigacion SET estado = '".concat(estado, "', avance = '").concat(avance, "', comentario = '").concat(comentario, "'  WHERE id_investigacion = ").concat(id_investigacion))];
            case 3:
                investigacion = _b.sent();
                return [2 /*return*/, res.json({
                        msg: "detalles de investigación actualizado",
                        investigacion: investigacion
                    })];
            case 4:
                res.status(400).json({ msg: "se requiere datos" });
                return [3 /*break*/, 6];
            case 5:
                e_7 = _b.sent();
                console.log(e_7);
                res.status(500).json({ msg: "Error " });
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.putDetalleInvestigacion = putDetalleInvestigacion;
//# sourceMappingURL=investigation.js.map