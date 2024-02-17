import Student from "../models/student_model";
import {Request,Response} from "express";
const getStudents = async (req: Request, res: Response) => {
  console.log("student get");
  try {
    let student;
    if (req.query.name) {
      student = await Student.find({ name: req.query.name });
    } else {
      student = await Student.find();
    }
    res.status(200).send(student);
  } catch (error) {
    console.log(error);
    res.status(400).send(error.message);
  }
};

const getStudentById = async (req: Request, res: Response) => {
  console.log(req.params);
  try {
    const student = await Student.findById(req.params.id);
    res.status(200).send(student);
  } catch (error) {
    console.log(error);
    res.status(400).send(error.message);
  }
};

const postStudents = async (req: Request, res: Response) => {
  console.log("student post ");
  try {
    const student = await Student.create(req.body);
    res.status(201).send(student);
  } catch (error) {
    console.log(error);
    res.status(400).send(error.message);
  }
};


const putStudents = async(req: Request, res: Response) => {
  try{
    const student = await Student.findById(req.params.id)
    if(req.body.name != student.name) {
      student.name = await req.body.name
    }
    else if (req.body.age != student.age)
    {
      student.age = await req.body.age
    }
    student.save()
    res.status(201).send(student)
  }catch (error) {
    console.log(error);
    res.status(400).send(error.message);
  }
};

const deleteStudents = async(req: Request, res: Response) => {
  try {
    await Student.findByIdAndDelete(req.params.id)
  } catch (error) {
    console.log(error);
    res.status(400).send(error.message);
  }
};

export default  {
  getStudents,
  getStudentById,
  postStudents,
  putStudents,
  deleteStudents,
};
