const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const Product = require('../models/productModel');
const Order = require('../models/orderModel');

//@desc get order
//@route GET /dofob/orders
//@access Public
const getAllOrders = asyncHandler ( async (req, res) => {
    try {
        const order = await Order.find({}).sort({
            date: -1,
        });

      res.status(200).json(order);
    } catch (error) {
        console.log(error.message);
        res.status(404)
        throw new Error('Server Error');
    };
});

//@desc get a user order
//@route GET /dofob/order:orderId
//@access Private
const getOrderById = asyncHandler ( async (req, res) => {
    const order = await Order.findById(req.params.orderId);
    if (!order) {
        res.status(400)
        throw new Error("This order does not Exist");
    };
    res.status(200).json(order);
});

//@desc create a new order
//@route POST /dofob/order
//@access Public
const sendOrder = asyncHandler(async (req, res) => {
    const { products, userOrder, status, address, country } = req.body;
    if (!products) {
        res.status(400)
        throw new Error("Invalid details");
    };
   try {
       const order = await Order.create({
         products,
         userOrder: req.user._id,
         status,
         address,
         country,
     });
     res.status(200).json({ message: "Order sent successfully " , order : order  });
   } catch (error) {
    if (error.name === "ValidationError") {
        res.status(400).json({ message: error.message });
    } else {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    };
   };
});

//@desc delete a user order
//@route DELETE /dofob/oder:OrderId
//@access Private
const deleteAnOrder = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.orderId);
    if (!order) {
        res.status(400)
        throw new Error("This particular order does not Exist");
    };
    await order.deleteOne();
    res.status(200).json({ message: " Admin deleted this order successfully "  ,  order : order});
});

module.exports = {
    getAllOrders,
    getOrderById,
    sendOrder,
    deleteAnOrder,
};


