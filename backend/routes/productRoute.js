const express = require('express');
const router = express.Router() ;
const { getProducts , setProducts , updateProducts ,deleteProducts } = require('../controllers/productController');
const{ protectAdmin  , protectUser} = require('../middlewares/authMiddleware') ;
const upload = require('../middlewares/upload')


router.get('/',getProducts);
router.delete('/admin/:id' , protectUser , protectAdmin , deleteProducts) ;
router.post('/admin',protectUser , protectAdmin ,upload.single("image"), setProducts) ;
router.put('/admin/:id',protectUser, protectAdmin , updateProducts) ;
module.exports = router 