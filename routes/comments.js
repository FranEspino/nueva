"use strict";
exports.__esModule = true;
var express_1 = require("express");
var express_validator_1 = require("express-validator");
var db_validators_1 = require("../helpers/db-validators");
var validate_fields_1 = require("../middlewares/validate-fields");
var comments_1 = require("../controllers/comments");
var router = (0, express_1.Router)();
router.get("/", [(0, express_validator_1.check)("id_investigacion").custom(db_validators_1.existsInvestigation), validate_fields_1.validateFields], comments_1.getComments);
router.post("/", [
    (0, express_validator_1.check)("id_investigacion").custom(db_validators_1.existsInvestigation),
    (0, express_validator_1.check)("id_persona").custom(db_validators_1.validPerson),
    (0, express_validator_1.check)("comentario").not().isEmpty(),
    validate_fields_1.validateFields,
], comments_1.postComments);
exports["default"] = router;
//# sourceMappingURL=comments.js.map