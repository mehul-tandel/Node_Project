const express = require('express');
const { check, body } = require('express-validator');

const authController = require('../controllers/auth');
const User = require('../models/user');

const router = express.Router();

router.get('/login', authController.getLogin);

router.get('/signup', authController.getSignup);

router.post('/login', authController.postLogin);

router.post('/signup', [
    check('email')
        .isEmail()
        .withMessage('Invalid Email')
        .custom((value,{req}) => {
            return User.findOne({email: value})
                .then(userDoc =>{
                if(userDoc){
                return Promise.reject('Email already exists.');
                } 
            })          
            }),
    body(
        'password',
        'Password should only include numbers and text and at least 5 characters long.'
    ).isLength({min: 5}).isAlphanumeric(),
    body('confirmPassword').custom((value,{req}) => {
        if (value !== req.body.password) {
            throw new Error('Passwords does not match.');
        }
        return true;
    })
],
     authController.postSignup);

router.post('/logout', authController.postLogout);

module.exports = router;