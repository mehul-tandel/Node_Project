const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getProducts = (req, res, next) => {
    Product.findAll().then(products => {
        res.render('shop/product-list', {
            prods: products,
            pageTitle: 'All Products',
            path: '/products'
        });
    }).catch(err => {
        console.log(err);
    });
};

exports.getProduct = (req, res) => {
    const prodId = req.params.productId;
    Product.findByPk(prodId) // Product.findAll({where:{id: prodId}}) ==> returns in array -->so product:product[0], pageTitle:products[0].title 
        .then(product => {
            res.render('shop/product-detail', {
                product: product, //object to be passed in template(accessed in view) : product found(by findById function)
                pageTitle: product.title,
                path: '/products' //for active css class in navbar
            });
        }).catch(err => { console.log(err) });
}

exports.getIndex = (req, res) => {
    Product.findAll().then(products => {
        res.render('shop/index', {
            prods: products,
            pageTitle: 'Shop',
            path: '/'
        });
    }
    ).catch(err => {
        console.log(err);
    })
}

exports.getCart = (req, res) => {
    req.user
        .getCart()
        .then(cart => {
            return cart.getProducts()
                .then(products => {
                    res.render('shop/cart', {
                        path: '/cart',
                        pageTitle: 'Your Cart',
                        products: products
                    });
                })
                .catch(err => { console.log(err) });
        })
        .catch(err => console.log(err));
}

exports.postCart = (req, res) => {
    const prodId = req.body.productId;
    let fetchedCart;
    let newQuantity = 1;
    req.user.getCart()
        .then(cart => {
            fetchedCart = cart;
            return cart.getProducts({ where: { id: prodId } });
        })
        .then(products => {
            let product;
            if (products.length > 0) {
                product = products[0];
            }
            
            if (product) {
                const oldQuantity = product.cartItem.quantity;
                newQuantity = oldQuantity + 1;
                return product;
            }
            return Product.findByPk(prodId)
        })
        .then(product => {
            return fetchedCart.addProduct(product,
                { through: { quantity: newQuantity } });
        })
        .then(() => {
            res.redirect('/cart');
        })
        .catch(err => console.log(err));
}

exports.postCartDeleteProduct = (req, res) => {
    const prodId = req.body.productId;
    req.user.getCart()
    .then(cart => {
        return cart.getProducts({where: {id: prodId}});
    })
    .then(products => {
        const product = products[0];
        return product.cartItem.destroy();
    })
    .then(result => {
        res.redirect('/cart');
    })
    .catch(err => console.log(err));
}

exports.getOrders = (req, res) => {
    res.render('shop/orders', {
        path: '/orders',
        pageTitle: 'Your Orders'
    });
}

exports.getCheckout = (req, res) => {
    res.render('/checkout', {
        path: '/checkout',
        pageTitle: 'Checkout'
    });
}