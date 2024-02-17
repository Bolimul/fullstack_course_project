const Student = require("../models/student_model");

const getStudents = async (req, res) => {
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

const getStudentById = async (req, res) => {
  console.log(req.params);
  try {
    const student = await Student.findById(req.params.id);
    res.status(200).send(student);
  } catch (error) {
    console.log(error);
    res.status(400).send(error.message);
  }
};

const postStudents = async (req, res) => {
  console.log("student post ");
  try {
    const student = await Student.create(req.body);
    res.status(201).send(student);
  } catch (error) {
    console.log(error);
    res.status(400).send(error.message);
  }
};

//updatye a sudent with the given id
const putStudents = async(req, res) => {
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

const deleteStudents = async(req, res) => {
  try {
    await Student.findByIdAndDelete(req.params.id)
  } catch (error) {
    console.log(error);
    res.status(400).send(error.message);
  }
};

module.exports = {
  getStudents,
  getStudentById,
  postStudents,
  putStudents,
  deleteStudents,
};
