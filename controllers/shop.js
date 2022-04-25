const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getProducts = (req,res,next)=>{
    Product.findAll().then(products=>{
        res.render('shop/product-list', {
            prods: products,
            pageTitle: 'All Products',
            path: '/products'
        });
    }).catch(err=>{
        console.log(err);
    });
};

exports.getProduct = (req,res) =>{
    const prodId = req.params.productId;
    Product.findByPk(prodId) // Product.findAll({where:{id: prodId}}) ==> returns in array -->so product:product[0], pageTitle:products[0].title 
    .then(product=>{
        res.render('shop/product-detail',{
            product: product, //object to be passed in template(accessed in view) : product found(by findById function)
            pageTitle: product.title,
            path: '/products' //for active css class in navbar
        });
    }).catch(err => {console.log(err)});
}

exports.getIndex = (req,res) => {
    Product.findAll().then(products =>{
        res.render('shop/index', {
            prods: products,
            pageTitle: 'Shop',
            path: '/'
        });
        }
    ).catch(err=>{
        console.log(err);
    }) 
}

exports.getCart = (req,res)=>{
    Cart.getCart(cart=>{
        Product.fetchAll(products =>{
            const cartProducts = [];
            for(product of products){
                const cartProductData = cart.products.find(p=>p.id===product.id);
                if (cartProductData){
                    cartProducts.push({productData: product, qty: cartProductData.qty});
                }
            }
            res.render('shop/cart',{
                path: '/cart',
                pageTitle: 'Your Cart',
                products : cartProducts
            });
        });
    });
    
}

exports.postCart = (req,res)=>{
    const prodId = req.body.productId;
    Product.findById(prodId,(product)=>{
        Cart.addProduct(prodId,product.price);
    });
    res.redirect('/cart');
}

exports.postCartDeleteProduct = (req,res)=>{
    const prodId = req.body.productId;
    Product.findById(prodId, product=>{
        Cart.deleteProduct(prodId,product.price);
        res.redirect('/cart');
    });
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