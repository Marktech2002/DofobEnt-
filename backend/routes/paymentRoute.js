const express = require('express');
const router = express.Router() ;
const { createPayment , Payment} = require ('../controllers/paymentController');
const{ protectAdmin , protectUser} = require('../middlewares/authMiddleware') ;

router.post('/' , createPayment );
router.get('/verify', protectUser , protectAdmin , Payment)

module.exports = router ;