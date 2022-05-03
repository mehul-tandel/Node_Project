const express = require('express');
const { check, body } = require('express-validator');

const authController = require('../controllers/auth');

const router = express.Router();

router.get('/login', authController.getLogin);

router.get('/signup', authController.getSignup);

router.post('/login', authController.postLogin);

router.post('/signup', [
    check('email').isEmail().withMessage('Invalid Email'),
    body(
        'password',
        'Password should only include numbers and text and at least 5 characters long.'
    ).isLength({min: 5}).isAlphanumeric()
],
     authController.postSignup);

router.post('/logout', authController.postLogout);

module.exports = router;