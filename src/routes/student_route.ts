import express from "express";
const router = express.Router();
import StudentController from "../controllers/student_controller";

router.get("/", StudentController.getStudents);
router.get("/:id", StudentController.getStudentById);

router.post("/", StudentController.postStudents);

router.put("/:id", StudentController.putStudents);

router.delete("/:id", StudentController.deleteStudents);

export default router;
