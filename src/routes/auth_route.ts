import express from "express";
const router = express.Router();
import authController from "../controllers/auth_controller"


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
*               - userID
*           properties:
*               accessToken:
*                   type: string
*                   description: The JWT access token
*               refreshToken:
*                   type: string
*                   description: The JWT refresh token
*               userID:
*                   type: string
*                   description: The id of current user
*           example:
*               accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjUxYWYyMWU2Nzc4M2ZjNTdlMWE2Y2QiLCJpYXQiOjE3MTY2MzQ2MjAsImV4cCI6MTcxNjYzNjQyMH0.DKwXKiHXmftrctWVP4VNUVhAmRbRs-q8UHIS_N0WA2c'
*               refreshToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjUxYWYyMWU2Nzc4M2ZjNTdlMWE2Y2QiLCJpYXQiOjE3MTY2MzQ2MjB9.Udp4bzD3h1Hh2kjqazfXFY2fueLfpxQbZT1CqYafGtQ'
*               userID: '6651af21e67783fc57e1a6cd'

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
router.post("/register", authController.register);

router.post("/google", authController.googleSignin);
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
router.post("/login", authController.login);
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
router.post("/logout", authController.logout);
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
router.get("/refresh", authController.refresh);

export default router;