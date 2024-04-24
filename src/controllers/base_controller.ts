import mongoose from "mongoose";
import {Request,Response} from "express";

class BaseController<ModelType> {
    ItemModel: mongoose.Model<ModelType>;
    constructor(ItemModel: mongoose.Model<ModelType>) {
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
      }
      
      async getById( req: Request, res: Response) {
        console.log(req.params);
        try {
          const item = await this.ItemModel.findById(req.params.id);
          return res.status(200).send(item);
        } catch (error) {
          console.log(error);
          res.status(400).send(error.message);
        }
      }
      
      async post(req: Request, res: Response) {
        try {
          const item = await this.ItemModel.create(req.body);
          res.status(201).send(item);
        } catch (error) {
          console.log(error);
          res.status(400).send(error.message);
        }
      }
      
      //implemented (works with implementations in derived classes)
      async put(req: Request, res: Response) {
        try{
          await req.body.save()
          res.status(201).send(req.body)
        }catch (error) {
          console.log(error);
          res.status(400).send(error.message);
        }
      }
      
      async remove(req: Request, res: Response) {
        try {
          await this.ItemModel.findByIdAndDelete(req.params.id)
          res.status(201).send()
        } catch (error) {
          console.log(error);
          res.status(400).send(error.message);
        }
      }

}

export default BaseController;