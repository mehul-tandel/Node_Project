const path = require('path');

const express = require('express');

const router = express.Router();

const products = [];

// /admin/add-product --> GET
// render(template,{object with contains variables to be passed into the template})
router.get('/add-product',(req,res)=>{
    res.render('add-product',{
        pageTitle: 'Add Product',
        path: '/admin/add-product',
        formsCSS: true,
        productCSS: true,
        activeAddProduct: true
    });
});

// /admin/add-product  --> POST
router.post('/add-product', (req,res)=>{
    products.push({title: req.body.title});
    res.redirect('/');
});

// module.exports.routes = router
exports.routes = router;
exports.products = products;