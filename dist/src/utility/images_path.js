"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var image_path = path_1.default.resolve(__dirname);
var mainpath = fs_1.default.readdirSync(image_path);
// loop 10 times to get the images folder
for (var x = 0; x < 10; x++) {
    if (mainpath.includes('images')) {
        console.log('when find images folder');
        console.log(image_path);
        image_path = path_1.default.resolve(image_path + '/images');
        console.log(image_path);
        break;
    }
    else {
        image_path = path_1.default.resolve(image_path + '/..');
        mainpath = fs_1.default.readdirSync(image_path);
        console.log('when not find images folder');
        console.log(image_path);
    }
    console.log(image_path);
}
exports.default = image_path;
