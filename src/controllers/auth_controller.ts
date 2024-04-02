import { Request, Response } from "express"
import User from "../models/user_model"
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'
const register = async (req: Request, res: Response) => 
{
    console.log(req.body)
    const email = req.body.email
    const password = req.body.password
    if(email == null || password == null)
    {
        return res.status(400).send("missing email or password")
    }
    try {
        const user = await User.findOne({email: email})
        if(user) 
        {
            return res.status(200).send("user already exists")
        }
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        const newUser = await User.create({
            'email': email,
            'password': hashedPassword
        })
        return res.status(200).send(newUser)
    } catch (error) {
        console.log(error)
        return res.status(400).send(error.message)
    }
}

const generateTokens = (userId: string):{accessToken: string, refreshToken: string} => {
    const token = jwt.sign({_id: userId}, process.env.TOKEN_SECRET, {expiresIn: process.env.TOKEN_EXPIRATION})
    const refreshToken = jwt.sign({_id: userId}, process.env.REFRESH_TOKEN_SECRET)
    return {
        accessToken: token,
        refreshToken: refreshToken
    }
}

const login = async (req: Request, res: Response) => 
{
    const email = req.body.email
    const password = req.body.password
    if(email == null || password == null)
    {
        return res.status(400).send("missing email or password")
    }

    
    try {
        const user = await User.findOne({email: email})
        if(user == null) 
        {
            return res.status(400).send("invalid user or password")
        }
        const validPassword = bcrypt.compare(password, user.password)
        if(validPassword == null)
        {
            return res.status(400).send("invalid user or password")
        }
        const {accessToken, refreshToken} = generateTokens(user._id.toString())
        if(user.tokens == null) {
            user.tokens = [refreshToken.toString()]
        }else {
            user.tokens.push(refreshToken.toString());
        }
        await user.save()
        return res.status(200).send({'accessToken': accessToken, 'refreshToken': refreshToken})
    } catch (error) {
        console.log(error)
        return res.status(400).send(error.message)
    }
}

const logout = (req: Request, res: Response) => 
{
    res.status(400).send("logout")
}

const refresh = async (req: Request, res: Response) => 
{
    //extract token from header
    const authHeader = req.headers['authorization']
    const oldRefreshToken = authHeader && authHeader.split(' ')[1];
    if(oldRefreshToken == null)
    {
        return res.status(401).send("missing token");
    }
    //verify token
    jwt.verify(oldRefreshToken, process.env.REFRESH_TOKEN_SECRET, async(err, userInfo: {_id: string}) => {
        if (err) {
            return res.status(403).send("invalid token"); 
        }
        try {
            const user = await User.findById(userInfo._id);
            if (user == null || user.tokens == null || !user.tokens.includes(oldRefreshToken)) {
                if(user.tokens != null) {
                    user.tokens = [];
                    await user.save();
                }
                return res.status(403).send("invalid token");
            }
            //generate new refresh token
            const {accessToken, refreshToken} = generateTokens(user._id.toString())

            //update refresh token in db
            user.tokens = user.tokens.filter(token => token !== oldRefreshToken);
            user.tokens.push(refreshToken.toString())
            await user.save()

            //return new access token & new refresh token
            return res.status(200).send({'accessToken': accessToken, 'refreshToken': refreshToken.toString()})
        } catch (error) {
            console.log(error);
            return res.status(400).send(error.message)
        }
    });
    
    

    
}

export default{
    register,
    login,
    logout,
    refresh
}