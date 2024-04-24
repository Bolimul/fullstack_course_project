"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const user_schema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    age: {
        type: String,
        required: true
    },
    imgUrl: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    tokens: {
        type: [String]
    }
});
exports.default = mongoose_1.default.model("User", user_schema);
//# sourceMappingURL=user_model.js.map