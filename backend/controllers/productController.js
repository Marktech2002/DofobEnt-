const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const Product = require('../models/productModel');
const cloudinary = require('../services/cloudinary');
//@desc get products
//@route GET /dofob/poducts 
//@access Public 

const getProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({}).sort({
        date: -1
    });
    res.status(200).json(products);

})

//@desc Admin to mange products
//@route POST /dofob/poducts/admin
//@access Private

const setProducts = asyncHandler(async (req, res) => {
    const { name, desc, price, image_url, quantity, categories } = req.body;
    const result = await cloudinary.uploader.upload(req.file.path); // image upload to cloudinary
    // console.log(result);
    try {
        if (!result) {
            throw new Error("NOT FOUND")
        }
        const product = await Product.create({
            name,
            desc,
            price,
            public_id: result.public_id,
            image_url: result.secure_url,
            quantity,
            categories,
        });
        res.status(201).json(product);

    } catch (error) {
        if (error.name === "ValidationError") {
            res.status(400).json({ message: error.message });
        } else {
            console.error(error);
            res.status(500).json({ message: "Server error" });
        }
    }
})

//@desc delete products
//@route GET /dofob/poducts/admin/:id
//@access Private

const deleteProducts = asyncHandler(async (req, res) => {
    // get the id
    const product = await Product.findById(req.params.id);
    if (!product) {
        res.status(400)
        throw new Error("Product not found")
    }
    //delete image from cloudinary 
    await cloudinary.uploader.destroy(product.public_id);
    console.log(product.public_id)
    await product.deleteOne();
    res.status(200).json(
        {
            message: "Admin has succefully deleted this product "
        })
})

//@desc Upadate a produ cts
//@route PUT /dofob/poducts/admin/:id
//@access Private

const updateProducts = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
        res.status(400)
        throw new Erorr("Product not found")
    }
    const updateProduct = await Product.findByIdAndUpdate(req.params.id, req.body)
    res.status(201).json({ message: "Admin has succefully upated this product " })
})


module.exports = {
    getProducts,
    setProducts,
    deleteProducts,
    updateProducts,
}