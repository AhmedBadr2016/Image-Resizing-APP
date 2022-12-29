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
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
Object.defineProperty(exports, "__esModule", { value: true });
// let's begine our application
var express_1 = __importDefault(require("express"));
var images_path_1 = __importDefault(require("../utility/images_path"));
var resize_1 = __importDefault(require("../utility/resize"));
var fs_1 = __importDefault(require("fs"));
var image = express_1.default.Router();
var resizeflag = false;
image.get('/', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, filename, height, width, valid_filename, valid_height, valid_width;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.query, filename = _a.filename, height = _a.height, width = _a.width;
                valid_filename = filename;
                valid_height = parseInt(height);
                valid_width = parseInt(width);
                if (!(Number.isNaN(valid_height) && Number.isNaN(valid_width))) return [3 /*break*/, 1];
                // No height nor width
                console.log('image without height & width');
                if (fs_1.default.readdirSync(images_path_1.default).includes("".concat(valid_filename, ".jpg")) &&
                    height == undefined &&
                    width == undefined) {
                    // existed in images folder
                    console.log('Existed in images foder');
                    res.sendFile("".concat(images_path_1.default, "/").concat(valid_filename, ".jpg"));
                }
                else {
                    // existed in images folder
                    console.log('Not existed in images foder');
                    res
                        .status(404)
                        .send('put you image in the images folder & enter the height and width as positive number');
                }
                return [3 /*break*/, 15];
            case 1:
                if (!(valid_height > 0 && valid_width > 0)) return [3 /*break*/, 6];
                // both the height & width are positive numbers
                console.log('Both height & width are positive');
                if (!fs_1.default
                    .readdirSync("".concat(images_path_1.default, "/cashing"))
                    .includes("".concat(valid_filename, "_resize").concat(valid_height, "x").concat(valid_width, ".jpg"))) return [3 /*break*/, 2];
                // if we resized the image before so no need to resize just get it
                console.log('we resized the image before so no need to resize just get it');
                res.sendFile("".concat(images_path_1.default, "/cashing/").concat(valid_filename, "_resize").concat(valid_height, "x").concat(valid_width, ".jpg"));
                resizeflag = true;
                return [3 /*break*/, 5];
            case 2:
                if (!(fs_1.default.readdirSync(images_path_1.default).includes("".concat(valid_filename, ".jpg")) &&
                    resizeflag == false)) return [3 /*break*/, 4];
                // we found the image in images folder and ready for resizing with the desired height and width
                console.log('we found the image in images folder and ready for resizing with the desired height and width');
                return [4 /*yield*/, (0, resize_1.default)(valid_height, valid_width, "".concat(images_path_1.default, "/").concat(valid_filename, ".jpg"), "".concat(images_path_1.default, "/cashing/").concat(valid_filename, "_resize").concat(valid_height, "x").concat(valid_width, ".jpg"))];
            case 3:
                _b.sent();
                res.sendFile("".concat(images_path_1.default, "/cashing/").concat(valid_filename, "_resize").concat(valid_height, "x").concat(valid_width, ".jpg"));
                return [3 /*break*/, 5];
            case 4:
                // the height and width are positive numbers but the image is not found in the image folder
                console.log('the height and width are positive numbers but the image is not found in the image folder');
                res.status(404).send('put you image in the images folder');
                _b.label = 5;
            case 5: return [3 /*break*/, 15];
            case 6:
                if (!(valid_height > 0 &&
                    Number.isNaN(valid_width) &&
                    width == undefined)) return [3 /*break*/, 10];
                // the height is positive numbers & No width
                console.log('the height is positive numbers & No width');
                if (!fs_1.default.readdirSync(images_path_1.default).includes("".concat(valid_filename, ".jpg"))) return [3 /*break*/, 8];
                // Only the height is positive numbers & the image is found in the image folder
                console.log('the height is positive numbers & the image is found in the image folder');
                return [4 /*yield*/, (0, resize_1.default)(valid_height, valid_height, "".concat(images_path_1.default, "/").concat(valid_filename, ".jpg"), "".concat(images_path_1.default, "/cashing/").concat(valid_filename, "_resize").concat(valid_height, "x").concat(valid_height, ".jpg"))];
            case 7:
                _b.sent();
                res.sendFile("".concat(images_path_1.default, "/cashing/").concat(valid_filename, "_resize").concat(valid_height, "x").concat(valid_height, ".jpg"));
                return [3 /*break*/, 9];
            case 8:
                // Only the height is positive number but the image is not found in the image folder
                console.log('Only the height is positive number but the image is not found in the image folder');
                res.status(404).send('put you image in the images folder');
                _b.label = 9;
            case 9: return [3 /*break*/, 15];
            case 10:
                if (!(valid_width > 0 && height == undefined)) return [3 /*break*/, 14];
                // the width is positive numbers & No height
                console.log('the width is positive numbers & No height');
                if (!fs_1.default.readdirSync(images_path_1.default).includes("".concat(valid_filename, ".jpg"))) return [3 /*break*/, 12];
                // We found the image in the images folder
                console.log('We found the image in the images folder');
                return [4 /*yield*/, (0, resize_1.default)(valid_width, valid_width, "".concat(images_path_1.default, "/").concat(valid_filename, ".jpg"), "".concat(images_path_1.default, "/cashing/").concat(valid_filename, "_resize").concat(valid_width, "x").concat(valid_width, ".jpg"))];
            case 11:
                _b.sent();
                res.sendFile("".concat(images_path_1.default, "/cashing/").concat(valid_filename, "_resize").concat(valid_width, "x").concat(valid_width, ".jpg"));
                return [3 /*break*/, 13];
            case 12:
                // Only the width is positive number but the image is not found in the image folder
                console.log('Only the width is positive number but the image is not found in the image folder');
                res.status(404).send('put you image in the images folder');
                _b.label = 13;
            case 13: return [3 /*break*/, 15];
            case 14:
                // The height or the width or the two are not positive number
                console.log('The height or the width or the two are not positive number');
                res
                    .status(404)
                    .send('http://localhost:3000/images?filename={desired_filename}&height={desired_height}&width={desired_width}');
                _b.label = 15;
            case 15: return [2 /*return*/];
        }
    });
}); });
exports.default = image;
// GoodBye (:
