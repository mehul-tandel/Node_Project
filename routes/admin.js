const path = require('path');

const express = require('express');

const adminController = require('../controllers/admin');

const router = express.Router();


// /admin/add-product --> GET
// render(template,{object with contains variables to be passed into the template})
router.get('/add-product', adminController.getAddProduct); //only reference to the function has to be provided(not executed)

// // /admin/products
// router.get('/products',adminController.getProducts);

// // /admin/add-product  --> POST
router.post('/add-product', adminController.postAddProduct);

// router.get('/edit-product/:productId',adminController.getEditProduct);

// router.post('/edit-product',adminController.postEditProduct);

// router.post('/delete-product',adminController.postDeleteProduct);

module.exports = router;
