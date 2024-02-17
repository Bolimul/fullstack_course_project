"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const post_controller_1 = __importDefault(require("../controllers/post_controller"));
router.get("/", post_controller_1.default.getPosts);
router.get("/:id", post_controller_1.default.getPosts);
router.post("/", post_controller_1.default.createPost);
router.put("/:id", post_controller_1.default.updatePost);
router.delete("/:id", post_controller_1.default.deletePost);
exports.default = router;
//# sourceMappingURL=post_route.js.map