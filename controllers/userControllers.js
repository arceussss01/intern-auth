const { JsonWebTokenError } = require('jsonwebtoken');
const User = require('../models/user');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');


const register = async (req, res) =>{
    
    const {username, email, password} = req.body;
    const hashPassword = await bcrypt.hash(password, 10);
    
    const newUser = new User({username, email, password:hashPassword})
    
    await newUser.save();
    res.status(201).json({message: `New User ${username} created successfully`})
}

const login = async (req, res) =>{
    
    console.log(req.body);
    
    const {username, password} = req.body;
    const user = await User.findOne({username});
    
    if(!user){
        return res.status(404).json({error: "Invalid username"});
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if(!isPasswordMatch){
        return res.status(401).json({error: "Invalid credientials"});
    }

    const payLoad = {
        username: user.username,
        email: user.email
    }

    const token = jwt.sign(payLoad, process.env.SECRET_KEY, {expiresIn: "1h"});
    
    res.status(200).json({token:token, message: `${user.username} Logged In Successfully`});
}

const getUsers = async(req, res) =>{
  try {
    const users = await User.find();
    res.status(200).json(users)
  } catch (error) {
    res.status(500).json({msg: "Internal Server Error"})
  }
   
}

module.exports = {register, login, getUsers};