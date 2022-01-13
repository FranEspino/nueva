"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.validateFields = void 0;
var express_validator_1 = require("express-validator");
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var validateFields = function (req, res, next) {
    var errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        //para eliminar archivos creados por error
        if (req.body.document) {
            var directory = path_1["default"].join(__dirname, "../documents/" + req.body.document);
            fs_1["default"].unlinkSync(directory);
        }
        if (req.body.avatar != "undefined" && req.body.document) {
            var directory = path_1["default"].join(__dirname, "../public/images/" + req.body.avatar);
            fs_1["default"].unlinkSync(directory);
        }
        /////////////////////////
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};
exports.validateFields = validateFields;
//# sourceMappingURL=validate-fields.js.map