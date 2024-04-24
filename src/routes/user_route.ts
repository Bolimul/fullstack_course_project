import express from "express";
const router = express.Router();
import UserController from "../controllers/user_controller";
import authMiddleware from "../common/auth_middleware";
/**
* @swagger
* tags:
*   name: User
*   description: The Authentication API
*/

/**
* @swagger
* components:
*   schemas:
*     Student:
*       type: object
*       required:
*         - name
*         - email
*         - age
*         - imgUrl
*         - password
*       properties:
*         name:
*           type: string
*           description: The user name
*         email:
*           type: string
*           description: The user email
*         age:
*           type: string
*           description: The user age
*         imgUrl:
*           type: string
*           description: The user link to image on the server. For test purposes there is a "url" link as default to test the user itself
*         password:
*           type: string
*           description: The user password
*       example:
*         name: 'jhon'
*         email: 'testemail@gmail.com'
*         age: '25'
*         imgUrl: 'url'(default)
*         password: 'rvh29vj21msH'
*/

/**
* @swagger
* /user:
*   get:
*     summary: Get all users
*     tags: [User]
*     security:
*       - bearerAuth: []
*     responses:
*       200:
*         description: list of all the users
*         content:
*           application/json:
*             schema:
*               type: array
*               items:
*                  $ref: '#/components/schemas/User'
*/
router.get("/",  authMiddleware, UserController.get.bind(UserController));
/**
 * @swagger
 * /user/{id}:
 *   get:
 *     summary: 'Get a user by ID'
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: 'path'
 *         name: 'id'
 *         required: true
 *         schema:
 *           type: 'string'
 *           example: '1I23d45'
 *           description: 'Unique ID of the student to retrieve'
 *     responses:
 *       '200':
 *         description: 'User's details'
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 */
router.get("/:id", authMiddleware, UserController.getById.bind(UserController));
/**
 * @swagger
 * /user/{id}:
 *   put:
 *     summary: 'Update user's data by ID'
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: 'path'
 *         name: 'id'
 *         required: true
 *         schema:
 *           type: 'string'
 *           example: '1I23d45'
 *           description: 'Unique ID of the user to retrieve'
 *     responses:
 *       '201':
 *         description: 'User's updated details'
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 */
router.put("/:id",authMiddleware, UserController.put.bind(UserController));
/**
 * @swagger
 * /user/{id}:
 *   delete:
 *     summary: 'Delete User by ID'
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: 'path'
 *         name: 'id'
 *         required: true
 *         schema:
 *           type: 'string'
 *           example: '1I23d45'
 *           description: 'Unique ID of the user to retrieve'
 *     responses:
 *       '201':
 *         description: 'User has been deleted'
 */
router.delete("/:id", authMiddleware, UserController.remove.bind(UserController));

export default router;
