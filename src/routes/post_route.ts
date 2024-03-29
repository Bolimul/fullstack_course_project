import express from "express";
const router = express.Router();
import PostController from "../controllers/post_controller";

router.get("/", PostController.get.bind(PostController));

router.get("/:id", PostController.getById.bind(PostController));

router.post("/", PostController.post.bind(PostController));

router.put("/:id", PostController.put.bind(PostController));

router.delete("/:id", PostController.remove.bind(PostController));

export default router;
