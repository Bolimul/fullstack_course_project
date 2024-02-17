import express from "express";
const router = express.Router();
import PostController from "../controllers/post_controller";

router.get("/", PostController.getPosts);

router.get("/:id", PostController.getPosts);

router.post("/", PostController.createPost);

router.put("/:id", PostController.updatePost);

router.delete("/:id", PostController.deletePost);

export default router;
