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
        const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET as string, {expiresIn: process.env.TOKEN_EXPIRATION})
        return res.status(200).send({'accessToken': token})
    } catch (error) {
        console.log(error)
        return res.status(400).send(error.message)
    }
}

const logout = (req: Request, res: Response) => 
{
    res.status(400).send("logout")
}

export default{
    register,
    login,
    logout
}