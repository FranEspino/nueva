"use strict";
exports.__esModule = true;
var express_1 = require("express");
var express_validator_1 = require("express-validator");
var validate_fields_1 = require("../middlewares/validate-fields");
var login_1 = require("../controllers/login");
var router = (0, express_1.Router)();
router.post("/", [
    (0, express_validator_1.check)("dni", "el dni es obligatorio").not().isEmpty().isLength({ min: 8 }),
    (0, express_validator_1.check)("clave", "la clave es obligatorio").not().isEmpty(),
    validate_fields_1.validateFields,
], login_1.login);
exports["default"] = router;
//# sourceMappingURL=auth.js.map