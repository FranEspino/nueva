"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = require("express");
var express_validator_1 = require("express-validator");
var users_1 = require("../controllers/users");
var file_image_multer_1 = __importDefault(require("../middlewares/file-image-multer"));
var db_validators_1 = require("../helpers/db-validators");
var validate_fields_1 = require("../middlewares/validate-fields");
var router = (0, express_1.Router)();
router.get("/", users_1.getUsers);
router.get("/investigadores", users_1.getInvestigators);
router.get("/asesores", users_1.getAdvisors);
router.get("/admin", users_1.getAdmin);
router.put("/configuracion/seguridad", users_1.putPassword);
//router.get("/:id");/*
router.post("/", file_image_multer_1["default"], [
    (0, express_validator_1.check)("tipo_cuenta").custom(db_validators_1.existsRole),
    (0, express_validator_1.check)("nombre", "se requiere un nombre").not().isEmpty(),
    (0, express_validator_1.check)("apellido", "se requiere un apellido").not().isEmpty(),
    (0, express_validator_1.check)("dni", "se requiere un dni").isLength({ min: 8 }),
    (0, express_validator_1.check)("dni").custom(db_validators_1.existsPerson),
    (0, express_validator_1.check)("telefono", "se requiere numero de telefono").isLength({ min: 9 }),
    (0, express_validator_1.check)("correo", "se requiere un email").isEmail(),
    (0, express_validator_1.check)("clave", "se requiere una contraseña").isLength({ min: 6 }),
    validate_fields_1.validateFields,
], users_1.postUser);
router.put("/", users_1.putPerson);
/*router.delete("/");
*/
exports["default"] = router;
//# sourceMappingURL=users.js.map