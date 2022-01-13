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
exports.putPerson = exports.putPassword = exports.getAdmin = exports.getAdvisors = exports.getInvestigators = exports.postUser = exports.getUsers = void 0;
var bcryptjs_1 = __importDefault(require("bcryptjs"));
var pool = require("../mysql/database");
var path_1 = __importDefault(require("path"));
var fs_1 = __importDefault(require("fs"));
var getUsers = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var investigators, advisors, admin, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                return [4 /*yield*/, pool.query("select *\n          from investigador as inv inner join persona as  pers\n         on inv.id_persona=pers.id_persona;\n         ")];
            case 1:
                investigators = _a.sent();
                return [4 /*yield*/, pool.query("select * from asesor inner join persona \n    on asesor.id_persona=persona.id_persona;\n    ")];
            case 2:
                advisors = _a.sent();
                return [4 /*yield*/, pool.query(" select * from usuario  as us\n    inner join tipo_cuenta  as tc\n    on us.id_tipocuenta = tc.id_tipocuenta\n    inner join persona as p\n    on us.id_persona = p.id_persona where tc.nombre= \"ADMIN\";")];
            case 3:
                admin = _a.sent();
                res.json({
                    investigadores: investigators,
                    asesores: advisors,
                    administradores: admin
                });
                return [3 /*break*/, 5];
            case 4:
                e_1 = _a.sent();
                res.status(500).json({
                    msg: "error en la peticion"
                });
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.getUsers = getUsers;
var postUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, nombre, apellido, dni, telefono, direccion, correo, foto, clave, tipo_cuenta, profesion, carrera, facultad, salt, hash, newUser, directory, dataUser, tipoCuentaAsesor, newCuentaAsesor, cuenta, newAsesor, directory, dataUser, tipoCuentaInvestigador, newCuentaInvestigador, newInvestigador, dataUser, tipoCuentaAdmin, newCuentaAdmin, err_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, nombre = _a.nombre, apellido = _a.apellido, dni = _a.dni, telefono = _a.telefono, direccion = _a.direccion, correo = _a.correo, foto = _a.foto, clave = _a.clave, tipo_cuenta = _a.tipo_cuenta, profesion = _a.profesion, carrera = _a.carrera, facultad = _a.facultad;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 16, , 17]);
                foto =
                    req.body.avatar == "undefined" || req.body.avatar == "null"
                        ? ""
                        : req.body.avatar;
                salt = bcryptjs_1["default"].genSaltSync(10);
                hash = bcryptjs_1["default"].hashSync(clave, salt);
                newUser = {
                    nombre: nombre,
                    apellido: apellido,
                    dni: dni,
                    telefono: telefono,
                    direccion: direccion,
                    correo: correo,
                    foto: foto
                };
                if (!(tipo_cuenta.toUpperCase() === "ASESOR")) return [3 /*break*/, 6];
                if (!profesion) {
                    if (req.body.avatar) {
                        directory = path_1["default"].join(__dirname, "../public/images/" + req.body.avatar);
                        fs_1["default"].unlinkSync(directory);
                    }
                    return [2 /*return*/, res.status(409).json({ msg: "profesión no especificada" })];
                }
                return [4 /*yield*/, pool.query("INSERT INTO persona set ?", [newUser])];
            case 2:
                dataUser = _b.sent();
                return [4 /*yield*/, pool.query("select * from tipo_cuenta where nombre=\"ASESOR\"")];
            case 3:
                tipoCuentaAsesor = _b.sent();
                console.log(tipoCuentaAsesor);
                newCuentaAsesor = {
                    id_persona: dataUser.insertId,
                    id_tipocuenta: tipoCuentaAsesor[0].id_tipocuenta,
                    dni: dni,
                    clave: hash
                };
                return [4 /*yield*/, pool.query("INSERT INTO usuario set?", [
                        newCuentaAsesor,
                    ])];
            case 4:
                cuenta = _b.sent();
                newAsesor = {
                    id_persona: dataUser.insertId,
                    profesion: profesion
                };
                return [4 /*yield*/, pool.query("INSERT INTO asesor set ?", [newAsesor])];
            case 5:
                _b.sent();
                // console.log("Pasajero:", pasajero);
                res.json({ message: "Usuario creado", data: dataUser });
                _b.label = 6;
            case 6:
                if (!(tipo_cuenta.toUpperCase() === "INVESTIGADOR")) return [3 /*break*/, 11];
                console.log("llego a investigador");
                console.log("carrera:", carrera, "facultad:", facultad);
                if (!facultad || !carrera) {
                    if (req.body.avatar) {
                        directory = path_1["default"].join(__dirname, "../public/images/" + req.body.avatar);
                        fs_1["default"].unlinkSync(directory);
                    }
                    return [2 /*return*/, res.status(400).json({
                            msg: "se requiere datos del investigador"
                        })];
                }
                return [4 /*yield*/, pool.query("INSERT INTO persona set ?", [newUser])];
            case 7:
                dataUser = _b.sent();
                return [4 /*yield*/, pool.query("select * from tipo_cuenta where nombre=\"INVESTIGADOR\"")];
            case 8:
                tipoCuentaInvestigador = _b.sent();
                newCuentaInvestigador = {
                    id_persona: dataUser.insertId,
                    id_tipocuenta: tipoCuentaInvestigador[0].id_tipocuenta,
                    dni: dni,
                    clave: hash
                };
                return [4 /*yield*/, pool.query("INSERT INTO usuario set?", [newCuentaInvestigador])];
            case 9:
                _b.sent();
                newInvestigador = {
                    id_persona: dataUser.insertId,
                    facultad: facultad,
                    carrera: carrera
                };
                return [4 /*yield*/, pool.query("INSERT INTO investigador set ?", [newInvestigador])];
            case 10:
                _b.sent();
                // console.log("Chofer:", chofer);
                res.json({ message: "Usuario creado", data: dataUser });
                _b.label = 11;
            case 11:
                if (!(tipo_cuenta.toUpperCase() === "ADMIN")) return [3 /*break*/, 15];
                return [4 /*yield*/, pool.query("INSERT INTO persona set ?", [newUser])];
            case 12:
                dataUser = _b.sent();
                return [4 /*yield*/, pool.query("select * from tipo_cuenta where nombre=\"ADMIN\"")];
            case 13:
                tipoCuentaAdmin = _b.sent();
                newCuentaAdmin = {
                    id_persona: dataUser.insertId,
                    id_tipocuenta: tipoCuentaAdmin[0].id_tipocuenta,
                    dni: dni,
                    clave: hash
                };
                return [4 /*yield*/, pool.query("INSERT INTO usuario set?", [newCuentaAdmin])];
            case 14:
                _b.sent();
                res.json({ message: "Usuario creado", data: dataUser });
                _b.label = 15;
            case 15: return [3 /*break*/, 17];
            case 16:
                err_1 = _b.sent();
                res.status(400).json({
                    msg: "problemas en el resgistro de usuario"
                });
                console.log(err_1);
                return [3 /*break*/, 17];
            case 17: return [2 /*return*/];
        }
    });
}); };
exports.postUser = postUser;
var getInvestigators = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var investigators, e_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, pool.query("select *\n          from investigador as inv inner join persona as  pers\n         on inv.id_persona=pers.id_persona;\n         ")];
            case 1:
                investigators = _a.sent();
                //   console.log(investigators);
                res.json({
                    rol: "Investigador",
                    investigadores: investigators
                });
                return [3 /*break*/, 3];
            case 2:
                e_2 = _a.sent();
                res.status(500).json({
                    msg: "error en la peticion"
                });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getInvestigators = getInvestigators;
var getAdvisors = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var advisors, e_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, pool.query("select * from asesor inner join persona \n    on asesor.id_persona=persona.id_persona;\n    ")];
            case 1:
                advisors = _a.sent();
                res.json({
                    rol: "Asesor",
                    asesores: advisors
                });
                return [3 /*break*/, 3];
            case 2:
                e_3 = _a.sent();
                res.status(500).json({
                    msg: "error en la peticion"
                });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getAdvisors = getAdvisors;
var getAdmin = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var admin, e_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, pool.query(" select * from usuario  as us\n    inner join tipo_cuenta  as tc\n    on us.id_tipocuenta = tc.id_tipocuenta\n    inner join persona as p\n    on us.id_persona = p.id_persona where tc.nombre= \"ADMIN\";")];
            case 1:
                admin = _a.sent();
                res.json({
                    rol: "Administrador",
                    administradores: admin
                });
                return [3 /*break*/, 3];
            case 2:
                e_4 = _a.sent();
                res.status(500).json({
                    msg: "error en la peticion"
                });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getAdmin = getAdmin;
var putPassword = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, clave, clave_repetida, dni, salt, hash, e_5;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, clave = _a.clave, clave_repetida = _a.clave_repetida, dni = _a.dni;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 5, , 6]);
                if (!clave && !clave_repetida && !dni) {
                    return [2 /*return*/, res.status(400).json({
                            msg: "datos incompletos"
                        })];
                }
                if (!(clave !== clave_repetida)) return [3 /*break*/, 2];
                return [2 /*return*/, res.status(400).json({
                        msg: "las claves no coinciden"
                    })];
            case 2:
                salt = bcryptjs_1["default"].genSaltSync(10);
                hash = bcryptjs_1["default"].hashSync(clave, salt);
                return [4 /*yield*/, pool.query("update usuario set clave=? where dni=?", [hash, dni])];
            case 3:
                _b.sent();
                return [2 /*return*/, res.json({ msg: "contraseña actualizada" })];
            case 4: return [3 /*break*/, 6];
            case 5:
                e_5 = _b.sent();
                res.status(500).json({
                    msg: "error en la peticion"
                });
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.putPassword = putPassword;
var putPerson = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id_persona, _a, nombre, apellido, telefono, correo, direccion, newPerson, person, e_6;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                id_persona = req.body.id_persona;
                _a = req.body, nombre = _a.nombre, apellido = _a.apellido, telefono = _a.telefono, correo = _a.correo, direccion = _a.direccion;
                if (!nombre || !apellido || !telefono || !correo || !direccion) {
                    return [2 /*return*/, res.status(400).json({
                            msg: "datos incompletos"
                        })];
                }
                newPerson = {
                    nombre: nombre,
                    apellido: apellido,
                    telefono: telefono,
                    direccion: direccion,
                    correo: correo
                };
                _b.label = 1;
            case 1:
                _b.trys.push([1, 8, , 9]);
                if (!id_persona) return [3 /*break*/, 6];
                return [4 /*yield*/, pool.query("select * from persona where id_persona=?", [id_persona])];
            case 2:
                person = _b.sent();
                if (!(person.length > 0)) return [3 /*break*/, 4];
                return [4 /*yield*/, pool.query("update persona set ? where id_persona=?", [
                        newPerson,
                        id_persona,
                    ])];
            case 3:
                _b.sent();
                return [2 /*return*/, res.json({ msg: "datos actualizados" })];
            case 4: return [2 /*return*/, res.status(400).json({
                    msg: "no existe la persona"
                })];
            case 5: return [3 /*break*/, 7];
            case 6: return [2 /*return*/, res.status(400).json({
                    msg: "datos incompletos"
                })];
            case 7: return [3 /*break*/, 9];
            case 8:
                e_6 = _b.sent();
                res.status(500).json({
                    msg: "error en la peticion"
                });
                return [3 /*break*/, 9];
            case 9: return [2 /*return*/];
        }
    });
}); };
exports.putPerson = putPerson;
//# sourceMappingURL=users.js.map