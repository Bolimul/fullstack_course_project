import express from "express";
const router = express.Router();
import PostController from "../controllers/post_controller";
import authMiddleware from "../common/auth_middleware";

router.get("/",authMiddleware, PostController.get.bind(PostController));

router.get("/:id",authMiddleware, PostController.getById.bind(PostController));

router.post("/",authMiddleware, PostController.post.bind(PostController));

router.put("/:id",authMiddleware, PostController.put.bind(PostController));

router.delete("/:id",authMiddleware, PostController.remove.bind(PostController));

export default router;
