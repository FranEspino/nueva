"use strict";
exports.__esModule = true;
var express_1 = require("express");
var files_1 = require("../controllers/files");
var router = (0, express_1.Router)();
router.get("/documents/:data", files_1.getDocuments);
router.get("/image/:data", files_1.getImage);
exports["default"] = router;
//# sourceMappingURL=files.js.map