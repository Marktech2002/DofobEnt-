const express = require('express');
const router = express.Router() ;
const { registerUser , loginUser ,getUser} = require('../controllers/userController') ;
const { protectUser } = require('../middlewares/authMiddleware')

router.post('/sign-up', registerUser)
router.post('/login', loginUser)
router.get('/me',protectUser , getUser)

module.exports = router 