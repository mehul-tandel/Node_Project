const user = require("../models/user");

exports.getLogin = (req, res) => {
    // const isLoggedIn = req.get('Cookie').split('=')[1].trim() === 'true';
    // const isLoggedIn = req.get('Cookie').split(';')[1].trim().split('=')[1] === 'true';
            
    res.render('auth/login', {
                path: '/login',
                pageTitle: 'Login',
                isAuthenticated: false
            });
}
exports.postLogin = (req, res) => {
    user.findById('626a7e020a41bced81d31c6f')
    .then(user => {
        req.session.isLoggedIn = true;
        req.session.user = user;
        res.redirect('/');
    })
    .catch(err => console.log(err));
};

exports.postLogout = (req, res) => {
    req.session.destroy(err => {
        console.log(err);
        res.redirect('/');
    })
};