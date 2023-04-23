const express = require('express');
const router = express.Router() ;
const { getAllOrders , getOrderById , sendOrder , deleteAnOrder } = require('../controllers/orderController');
const{ protectAdmin  , protectUser} = require('../middlewares/authMiddleware')

router.get('/', protectUser ,protectAdmin, getAllOrders);
router.get('/:orderId', protectUser, protectAdmin, getOrderById);
router.post('/', protectUser, sendOrder);
router.delete('/:orderId', protectUser,protectAdmin, deleteAnOrder);

module.exports = router ;