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
const getPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("getPosts");
    try {
        let post;
        if (req.params.id) {
            post = yield post_model_1.default.findById(req.params.id);
        }
        else {
            post = yield post_model_1.default.find();
        }
        res.status(200).send(post);
    }
    catch (error) {
        console.log(error);
        res.status(400).send(error.message);
    }
});
const createPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("createPost");
    try {
        const new_post = yield post_model_1.default.create(req.body);
        res.status(201).send(new_post);
    }
    catch (error) {
        console.log(error);
        res.status(400).send(error.message);
    }
});
const updatePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const post = yield post_model_1.default.findById(req.params.id);
        if (post.post_title != req.body.post_title) {
            post.post_title = yield req.body.post_title;
        }
        else if (post.post_text != req.body.post_text) {
            post.post_text = yield req.body.post_text;
        }
        post.save();
        res.status(201).send(post);
    }
    catch (error) {
        console.log(error);
        res.status(400).send(error.message);
    }
});
const deletePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("deletePostById");
    try {
        yield post_model_1.default.findByIdAndDelete(req.params.id);
    }
    catch (error) {
        console.log(error);
        res.status(400).send(error.message);
    }
    res.status(200).send();
});
exports.default = {
    getPosts,
    createPost,
    updatePost,
    deletePost
};
//# sourceMappingURL=post_controller.js.map