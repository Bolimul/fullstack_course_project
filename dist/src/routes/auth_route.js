"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const auth_controller_1 = __importDefault(require("../controllers/auth_controller"));
/**
 * @swagger
 * tags:
 *      name: Auth
 *      description: The Authentification API
 */
/**
 * @swagger
 * components:
 *      securitySchemes:
 *          bearerAuth:
 *              type: http
 *              scheme: bearer
 *              bearerFormat: JWT
 */
/**
* @swagger
* components:
*   schemas:
*       Auth:
*           type: object
*           required:
*               - email
*               - password
*           properties:
*               email:
*                   type: string
*                   description: The user email
*               password:
*                   type: string
*                   description: The user password
*           example:
*               email: 'testemail@gmail.com'
*               password: 'rvh29vj21msH'
*       Tokens:
*           type: object
*           required:
*               - accessToken
*               - refreshToken
*           properties:
*               accessToken:
*                   type: string
*                   description: The JWT access token
*               refreshToken:
*                   type: string
*                   description: The JWT refresh token
*           example:
*               accessToken: '123cd123x1xx1'
*               refreshToken: '134r2134cr1x3c'

*/
/**
* @swagger
* /auth/register:
*   post:
*       summary: registers a new user
*       tags: [Auth]
*       requestBody:
*           required: true
*           content:
*               application/json:
*                   schema:
*                       $ref: '#/components/schemas/User'
*       responses:
*          200:
*              description: The new user
*              content:
*                  application/json:
*                      schema:
*                          $ref: '#/components/schemas/User'
*/
router.post("/register", auth_controller_1.default.register);
router.post("/google", auth_controller_1.default.googleSignin);
/**
* @swagger
* /auth/login:
*   post:
*       summary: login a user
*       tags: [Auth]
*       requestBody:
*           required: true
*           content:
*               application/json:
*                   schema:
*                       $ref: '#/components/schemas/Auth'
*       responses:
*          200:
*              description: The logged in user
*              content:
*                  application/json:
*                      schema:
*                          $ref: '#/components/schemas/Tokens'
*/
router.post("/login", auth_controller_1.default.login);
/**
* @swagger
* /auth/logout:
*   post:
*     summary: logout a user
*     tags: [Auth]
*     description: need to provide the refresh token in the auth header
*     security:
*       - bearerAuth: []
*     responses:
*       200:
*         description: logout completed successfully
*/
router.post("/logout", auth_controller_1.default.logout);
/**
* @swagger
* /auth/refresh:
*   get:
*       summary: get a new access token using the refresh token
*       tags: [Auth]
*       description: need to provide the refresh token in the auth header
*       security:
*           - bearerAuth: []
*       responses:
*           200:
*               description: The access & refresh tokens
*               content:
*                   application/json:
*                       schema:
*                           $ref: '#/components/schemas/Tokens'
*/
router.get("/refresh", auth_controller_1.default.refresh);
exports.default = router;
//# sourceMappingURL=auth_route.js.map