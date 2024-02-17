"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const student_model_1 = __importDefault(require("../models/student_model"));
const getStudents = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("student get");
    try {
        let student;
        if (req.query.name) {
            student = yield student_model_1.default.find({ name: req.query.name });
        }
        else {
            student = yield student_model_1.default.find();
        }
        res.status(200).send(student);
    }
    catch (error) {
        console.log(error);
        res.status(400).send(error.message);
    }
});
const getStudentById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.params);
    try {
        const student = yield student_model_1.default.findById(req.params.id);
        res.status(200).send(student);
    }
    catch (error) {
        console.log(error);
        res.status(400).send(error.message);
    }
});
const postStudents = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("student post ");
    try {
        const student = yield student_model_1.default.create(req.body);
        res.status(201).send(student);
    }
    catch (error) {
        console.log(error);
        res.status(400).send(error.message);
    }
});
const putStudents = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const student = yield student_model_1.default.findById(req.params.id);
        if (req.body.name != student.name) {
            student.name = yield req.body.name;
        }
        else if (req.body.age != student.age) {
            student.age = yield req.body.age;
        }
        student.save();
        res.status(201).send(student);
    }
    catch (error) {
        console.log(error);
        res.status(400).send(error.message);
    }
});
const deleteStudents = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield student_model_1.default.findByIdAndDelete(req.params.id);
    }
    catch (error) {
        console.log(error);
        res.status(400).send(error.message);
    }
});
exports.default = {
    getStudents,
    getStudentById,
    postStudents,
    putStudents,
    deleteStudents,
};
//# sourceMappingURL=student_controller.js.map