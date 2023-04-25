const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const { use } = require('../routes/productRoute');

//@desc register new user  
//@route POST /user/sign-up  
//@access Public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    // credentials defaults
    if (!name || !email || !password) {
        res.status(400)
        throw new Error('Please enter all the fields');
    };
    // check if user already exit 
    const userExists = await User.findOne({ email });
    if (userExists) {
        res.status(400)
        throw new Error("User already exist")
    };
    // hashed password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    // store in database 
    const user = await User.create({
        name,
        email,
        password: hashedPassword,
    });
    if (user) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email ,
            token : generateToken(user._id) ,
        });
    }
    else {
        res.status(400)
        throw new Error("Invalid user data")
    };
});

//@desc     Authenticate a new user  
//@route POST /user/login 
//@access Public
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    //if the email exists
    const user = await User.findOne({ email });
    //compare email with password
    if (user && (await bcrypt.compare(password, user.password))) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email ,
            isAdmin : user.isAdmin ,  
            token : generateToken(user._id)
        });
    }
    else {
        res.status(400)
        throw new Error ("Invalid Credentials");
    };
});

//@desc Get a user  
//@route GET /user/me
//@access Private
const getUser = asyncHandler (async (req, res) => {
    const user = await User.findById(req.user.id);
    res.status(200).json({
        _id: user.id,
        name: user.name,
        email: user.email ,
    });
});

//generate a token 
 const generateToken = (id)=> {
    return jwt.sign({ id } ,process.env.JWT_SECRET , {
        expiresIn : '30d' ,
    });
 };
  
module.exports = {
    registerUser,
    loginUser,
    getUser,
};

