"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const user_controller_1 = __importDefault(require("../controllers/user_controller"));
const auth_middleware_1 = __importDefault(require("../common/auth_middleware"));
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
*     User:
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
*           name: 'jhon'
*           email: 'testemail@gmail.com'
*           age: '25'
*           imgUrl: 'url'
*           password: 'rvh29vj21msH'
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
router.get("/", auth_middleware_1.default, user_controller_1.default.get.bind(user_controller_1.default));
/**
 * @swagger
 * /user/{id}:
 *   get:
 *     summary: Get a user by ID
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: 1I23d45
 *           description: Unique ID of the student to retrieve
 *     responses:
 *       '200':
 *         description: 'Users details'
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 */
router.get("/:id", auth_middleware_1.default, user_controller_1.default.getById.bind(user_controller_1.default));
/**
 * @swagger
 * /user/{id}:
 *   put:
 *     summary: Update users data by ID
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
*          required: true
*          content:
*            application/json:
*              schema:
*                $ref: '#/components/schemas/User'
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: 1I23d45
 *           description: Unique ID of the user to update
 *     responses:
 *       201:
 *         description: Users updated details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 */
router.put("/:id", auth_middleware_1.default, user_controller_1.default.put.bind(user_controller_1.default));
/**
 * @swagger
 * /user/{id}:
 *   delete:
 *     summary: 'Delete user by ID'
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
 *           description: 'Unique ID of the user to delete'
 *     responses:
 *       '201':
 *         description: 'Post has been deleted'
 */
router.delete("/:id", auth_middleware_1.default, user_controller_1.default.remove.bind(user_controller_1.default));
exports.default = router;
//# sourceMappingURL=user_route.js.map