import express from "express";
const router = express.Router();
import UserController from "../controllers/user_controller";
import authMiddleware from "../common/auth_middleware";
/**
* @swagger
* tags:
*   name: Student
*   description: The Authentication API
*/

/**
* @swagger
* components:
*   schemas:
*     Student:
*       type: object
*       required:
*         - _id
*         - name
*         - age
*       properties:
*         _id:
*           type: string
*           description: The user id
*         name:
*           type: string
*           description: The user name
*         age:
*           type: number
*           description: The user age
*       example:
*         _id: '12345'
*         name: 'jhon'
*         age: 25
*/

/**
* @swagger
* /student:
*   get:
*     summary: Get all students
*     tags: [Student]
*     security:
*       - bearerAuth: []
*     responses:
*       200:
*         description: list of all the students
*         content:
*           application/json:
*             schema:
*               type: array
*               items:
*                  $ref: '#/components/schemas/Student'
*/
router.get("/",  authMiddleware, UserController.get.bind(UserController));
/**
 * @swagger
 * /student/{id}:
 *   get:
 *     summary: 'Get a student by ID'
 *     tags: [Student]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: 'path'
 *         name: 'id'
 *         required: true
 *         schema:
 *           type: 'string'
 *           example: '12345'
 *         description: 'Unique ID of the student to retrieve'
 *     responses:
 *       '200':
 *         description: 'Student details'
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Student'
 */
router.get("/:id", authMiddleware, UserController.getById.bind(UserController));

router.put("/:id",authMiddleware, UserController.put.bind(UserController));

router.delete("/:id", authMiddleware, UserController.remove.bind(UserController));

export default router;
