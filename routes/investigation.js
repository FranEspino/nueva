"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = require("express");
var express_validator_1 = require("express-validator");
var db_validators_1 = require("../helpers/db-validators");
var validate_fields_1 = require("../middlewares/validate-fields");
var file_multer_1 = __importDefault(require("../middlewares/file-multer"));
var investigation_1 = require("../controllers/investigation");
var router = (0, express_1.Router)();
router.post("/", file_multer_1["default"], [
    (0, express_validator_1.check)("id_investigador", "El id del investigador es obligatorio").custom(db_validators_1.existsInvestigator),
    (0, express_validator_1.check)("titulo", "Se requiere un titulo").not().isEmpty(),
    (0, express_validator_1.check)("id_asesor", "El id del asesor es obligatorio").custom(db_validators_1.existsAsesor),
    validate_fields_1.validateFields,
], investigation_1.postInvestigation);
router.put("/archivo/:id_investigacion", file_multer_1["default"], investigation_1.putArchivo);
router.put("/archivo64", investigation_1.putArchivo64);
router.get("/", investigation_1.getInvestigations);
router.put("/", file_multer_1["default"], investigation_1.putInvestigations);
router.put("/detalle", investigation_1.putDetalleInvestigacion);
router.get("/detalle/historial/:id_investigacion", investigation_1.getDetalleHistorial);
exports["default"] = router;
/*
    url_archivo,
    titulo,
    descripcion,
    fecha_inicio,
  */
//# sourceMappingURL=investigation.js.map