"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var path_1 = __importDefault(require("path"));
var multer_1 = __importDefault(require("multer"));
var storage = multer_1["default"].diskStorage({
    destination: path_1["default"].join(__dirname, "../public/images"),
    filename: function (req, file, cb) {
        var extension = Date.now() + "-image-" + file.originalname;
        cb(null, extension);
        req.body.avatar = "".concat(extension);
    }
});
var uploadImage = (0, multer_1["default"])({
    fileFilter: function (req, file, cb) {
        var filetypes = /jpeg|jpg|png|svg/;
        var mimetype = filetypes.test(file.mimetype);
        if (mimetype) {
            cb(null, true);
        }
        else {
            req.body.avatar = null;
            cb(null, false);
        }
    },
    storage: storage
}).single("avatar");
exports["default"] = uploadImage;
//# sourceMappingURL=file-image-multer.js.map