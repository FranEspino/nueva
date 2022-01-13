"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var path_1 = __importDefault(require("path"));
var multer_1 = __importDefault(require("multer"));
var diskstorage = multer_1["default"].diskStorage({
    destination: path_1["default"].join(__dirname, "../documents"),
    filename: function (req, file, cb) {
        // console.log(file);
        var extension = Date.now() + "-document-" + file.originalname;
        cb(null, extension);
        req.body.document = extension;
    }
});
var fileUpload = (0, multer_1["default"])({
    fileFilter: function (req, file, cb) {
        if (file.mimetype === "application/pdf") {
            cb(null, true);
        }
        else {
            cb(null, false);
        }
    },
    storage: diskstorage
}).single("documents");
exports["default"] = fileUpload;
//# sourceMappingURL=file-multer.js.map