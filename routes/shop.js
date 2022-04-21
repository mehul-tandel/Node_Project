const path = require('path');

const express = require('express');

const adminData = require('./admin');

const router = express.Router();

// __dirname gives path to folder where THIS file exists
// .. goes up one level in folder hierarchy
router.get('/',(req,res)=>{
    const products = adminData.products;
    res.render('shop', {prods: products, pageTitle: 'Shop',path: '/'});
});

module.exports = router;