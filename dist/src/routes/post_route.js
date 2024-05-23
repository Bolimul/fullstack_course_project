"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const post_controller_1 = __importDefault(require("../controllers/post_controller"));
const auth_middleware_1 = __importDefault(require("../common/auth_middleware"));
/**
* @swagger
* tags:
*   name: Post
*   description: The Authentication API
*/
/**
* @swagger
* components:
*   schemas:
*     Post:
*       type: object
*       required:
*         - creator_id
*         - post_title
*         - post_text
*         - imgUrl
*       properties:
*           creator_id:
*             type: string
*             description: The id of the post owner
*           post_title:
*             type: string
*             description: The title of the post
*           post_text:
*             type: string
*             description: The content(text) of the post
*           imgUrl:
*             type: string
*             description: The post link to image on the server. For test purposes there is a "url" link as default to test the user itself
*       example:
*         creator_id: '1I23d45'
*         post_title: 'The Post title'
*         post_text: 'The post text ...'
*         imgUrl: 'url'
*/
/**
* @swagger
* /post:
*   get:
*     summary: Get all posts
*     tags: [Post]
*     security:
*       - bearerAuth: []
*     responses:
*       200:
*         description: list of all the posts
*         content:
*           application/json:
*             schema:
*               type: array
*               items:
*                  $ref: '#/components/schemas/Post'
*/
router.get("/", auth_middleware_1.default, post_controller_1.default.get.bind(post_controller_1.default));
/**
 * @swagger
 * /post/{id}:
 *   get:
 *     summary: Get a post by ID
 *     tags: [Post]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       requestBody:
*          required: true
*          content:
*            application/json:
*              schema:
*                $ref: '#/components/schemas/Post'
 *     responses:
 *       '200':
 *         description: Post details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 */
router.get("/:id", auth_middleware_1.default, post_controller_1.default.getById.bind(post_controller_1.default));
/**
 * @swagger
 * /post:
 *   post:
 *     summary: Post a post
 *     tags: [Post]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
*          required: true
*          content:
*            application/json:
*              schema:
*                $ref: '#/components/schemas/Post'
 *     responses:
 *       '200':
 *         description: Post details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 */
router.post("/", auth_middleware_1.default, post_controller_1.default.post.bind(post_controller_1.default));
/**
 * @swagger
 * /post/{id}:
 *   put:
 *     summary: Update post by ID
 *     tags: [Post]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
*          required: true
*          content:
*            application/json:
*              schema:
*                $ref: '#/components/schemas/Post'
 *     parameters:
 *       - in: 'path'
 *         name: 'id'
 *         required: true
 *         schema:
 *           type: 'string'
 *           example: '1I23d45'
 *           description: 'Unique ID of the post to update'
 *     responses:
 *       '201':
 *         description: Updated post details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 */
router.put("/:id", auth_middleware_1.default, post_controller_1.default.put.bind(post_controller_1.default));
/**
 * @swagger
 * /post/{id}:
 *   delete:
 *     summary: 'Delete post by ID'
 *     tags: [Post]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: 'path'
 *         name: 'id'
 *         required: true
 *         schema:
 *           type: 'string'
 *           example: '1I23d45'
 *           description: 'Unique ID of the post to delete'
 *     responses:
 *       '201':
 *         description: 'Post has been deleted'
 */
router.delete("/:id", auth_middleware_1.default, post_controller_1.default.remove.bind(post_controller_1.default));
exports.default = router;
//# sourceMappingURL=post_route.js.map