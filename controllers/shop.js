const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getProducts = (req,res,next)=>{
    Product.fetchAll((products)=>{
        res.render('shop/product-list', {
            prods: products,
            pageTitle: 'All Products',
            path: '/products'
        });
    });
};

exports.getProduct = (req,res) =>{
    const prodId = req.params.productId;
    Product.findById(prodId, product => {
        res.render('shop/product-detail',{
            product: product, //object to be passed in template(accessed in view) : product found(by findById function)
            pageTitle: product.title,
            path: '/products' //for active css class in navbar
        }); 
    });
}

exports.getIndex = (req,res) => {
    Product.fetchAll((products)=>{
        res.render('shop/index', {
            prods: products,
            pageTitle: 'Shop',
            path: '/'
        });
    });
}

exports.getCart = (req,res)=>{
    res.render('shop/cart',{
        path: '/cart',
        pageTitle: 'Your Cart'
    });
}

exports.postCart = (req,res)=>{
    const prodId = req.body.productId;
    Product.findById(prodId,(product)=>{
        Cart.addProduct(prodId,product.price);
    });
    res.redirect('/cart');
}

exports.getOrders = (req,res)=>{
    res.render('shop/orders',{
        path: '/orders',
        pageTitle: 'Your Orders'
    });
}

exports.getCheckout = (req,res) =>{
    res.render('/checkout',{
        path: '/checkout',
        pageTitle: 'Checkout'
    });
}