import User, { IUser } from "../models/user_model";
import {Request,Response} from "express";
import BaseController from "./base_controller";

//const studentController = new BaseController<IUser>(User)
class UserController extends BaseController<IUser> {
    constructor() {
        super(User);
    }

    async put(req: Request, res: Response) {
        try{
            let item = await this.ItemModel.findById(req.params.id)
            item.name = req.body.name;
            item.email = req.body.email;
            item.age = req.body.age;
            item.imgUrl = req.body.imgUrl;
            item.password = req.body.password;
            req.body = item;
            super.post(req, res);
        }catch(err){
            console.log("The error in updating user is: " + err)
            res.status(400).send(err.message);
        }
    }
}

export default  new UserController()
