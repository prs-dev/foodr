const {hashPassword, comparePasswords} = require("../utils/hash")
const User = require("../models/User")
const jwt = require("jsonwebtoken")

const registerUser = async(req, res) => {
    const {name, email, password} = req.body
    try {
        //user exists
        const exists = await User.findOne({email})
        if(exists) {
            return res.status(400).json({err: "User already exists!"})
        }
        const user = await User.create({
            name, email, password: await hashPassword(password)
        })
        return res.status(201).json({msg: "User created", user})
    } catch (error) {
        console.log(error)
    }
}

const loginUser = async(req, res) => {
    const {email, password} = req.body
    try {
        //user exists
        const user = await User.findOne({email})
        if(!user) {
            return res.status(400).json({err: "User does not exists!"})
        }
        const match = await comparePasswords(password, user.password)
        if(!match) {
            return res.status(401).json({err: "Incorrect password!"})
        }

        //after successful login a token is generated
        const token = jwt.sign({email, id: user._id}, process.env.SECRET)
        return res.status(200).json({msg: `${user.name} successfully logged in!`, token})
       
    } catch (error) {
        console.log(error)
    }   
}

const profile = async(req, res) => {
    try {
        const user = req.user
        const details = await User.findOne({email: user?.email})
        return res.status(200).json({details})
    } catch (error) {
        console.log(error)
    }
    res.json("reached")
}

module.exports = {
    registerUser,
    loginUser,
    profile
}