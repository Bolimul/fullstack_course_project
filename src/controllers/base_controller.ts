import mongoose from "mongoose";
import {Request,Response} from "express";

class BaseController<ModelType> {
    ItemModel: mongoose.Model<ModelType>;
    constructor(ItemModel: any) {
        this.ItemModel = ItemModel
    }

    async get(req: Request, res: Response) {
        console.log("get");
        try {
          if (req.query.name) {
            const item = await this.ItemModel.find({ name: req.query.name });
            return res.status(200).send(item);
          } else {
            const item = await this.ItemModel.find();
            return res.status(200).send(item);
          }
        } catch (error) {
          console.log(error);
          res.status(400).send(error.message);
        }
      };
      
      async getById( req: Request, res: Response) {
        console.log(req.params);
        try {
          const item = await this.ItemModel.findById(req.params.id);
          return res.status(200).send(item);
        } catch (error) {
          console.log(error);
          res.status(400).send(error.message);
        }
      };
      
      async post(req: Request, res: Response) {
        console.log("student post ");
        try {
          const item = await this.ItemModel.create(req.body);
          return res.status(201).send(item);
        } catch (error) {
          console.log(error);
          res.status(400).send(error.message);
        }
      };
      
      //not implemented
      async put(req: Request, res: Response) {
        try{
          const item = await this.ItemModel.findById(req.params.id)
          await item.save()
          return res.status(201).send(item)
        }catch (error) {
          console.log(error);
          res.status(400).send(error.message);
        }
      };
      
      async remove(req: Request, res: Response) {
        try {
          await this.ItemModel.findByIdAndDelete(req.params.id)
        } catch (error) {
          console.log(error);
          res.status(400).send(error.message);
        }
      };

}

export default BaseController;