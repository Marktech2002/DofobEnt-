const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

const protectUser = asyncHandler(async (req, res, next) => {
    let token
    // check for token in header
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            //get the token
            token = req.headers.authorization.split(' ')[1];
            //verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            //get user details
            req.user = await User.findById(decoded.id).select('-password');
            next();

        } catch (error) {
            console.log(error)
            res.status(401)
            throw new Error('Not authorized')
        }
    }
    // Missing token
    if (!token) {
        res.status(401)
        throw new Error('Not authorized , no token')

    }

})

/*
This second middleware (protectAdmin) checks whether the user 
retrieved by the first middleware 
exists and has the 
isAdmin property set to true. 
 */
const protectAdmin = asyncHandler(async (req, res, next) => {
    const user =  await User.findOne(req.user);
   // console.log(req); 
    if (user && user.isAdmin) {
      console.log("User is an admin");
      next();
    } 
     else {
      res.status(401)
      throw new Error("User is not an admin ");
    } 
})



module.exports = {
    protectUser,
    protectAdmin ,
}