const path = require('path');

const express = require('express');

const productsController = require('../controllers/products');

const router = express.Router();



// /admin/add-product --> GET
// render(template,{object with contains variables to be passed into the template})
router.get('/add-product', productsController.getAddProduct); //only reference to the function has to be provided(not executed)

// /admin/add-product  --> POST
router.post('/add-product', productsController.postAddProduct);

module.exports = router;
