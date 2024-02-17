import Student, { IStudent } from "../models/student_model";
import {Request,Response} from "express";
import BaseController from "./base_controller";

const studentController = new BaseController<IStudent>(Student)

export default  studentController
