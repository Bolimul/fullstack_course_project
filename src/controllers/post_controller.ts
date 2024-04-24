import BaseController from "./base_controller";
import Post, { IPost } from "../models/post_model";
import { Request, Response } from "express";

class PostController extends BaseController<IPost> {
    constructor() {
        super(Post);
    }

    async post(req: Request, res: Response) {
        req.body.creator_id = req.body.user._id;
        super.post(req, res);
    }

    async put(req: Request, res: Response) {
        let item = await this.ItemModel.findById(req.params.id)
        item.post_title = req.body.post_title
        item.post_text = req.body.post_text
        req.body = item
        super.post(req, res);
    }
}

export default new PostController()
