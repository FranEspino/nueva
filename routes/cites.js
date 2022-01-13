"use strict";
exports.__esModule = true;
var express_1 = require("express");
var express_validator_1 = require("express-validator");
var db_validators_1 = require("../helpers/db-validators");
var validate_fields_1 = require("../middlewares/validate-fields");
var cites_1 = require("../controllers/cites");
var router = (0, express_1.Router)();
router.post("/", cites_1.postCites);
router.get("/", cites_1.getCites);
router.put("/", [(0, express_validator_1.check)("id_investigacion").custom(db_validators_1.existsInvestigation), validate_fields_1.validateFields], cites_1.putCites);
//router.delete("/");
exports["default"] = router;
//# sourceMappingURL=cites.js.map