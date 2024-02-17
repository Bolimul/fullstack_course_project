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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const post_model_1 = __importDefault(require("../models/post_model"));
const base_controller_1 = __importDefault(require("./base_controller"));
const getPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("getPosts");
    base_controller_1.default.get(post_model_1.default, req, res);
});
const getPostById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.params);
    base_controller_1.default.getById(post_model_1.default, req, res);
});
const createPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("createPost");
    base_controller_1.default.post(post_model_1.default, req, res);
});
const updatePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    base_controller_1.default.put(post_model_1.default, req, res);
});
const deletePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("deletePostById");
    base_controller_1.default.remove(post_model_1.default, req, res);
});
exports.default = {
    getPosts,
    getPostById,
    createPost,
    updatePost,
    deletePost
};
//# sourceMappingURL=post_controller.js.map