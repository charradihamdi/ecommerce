const express = require('express');
const { JsonWebTokenError } = require('jsonwebtoken');
const {validateSignupRequist,validateSigninRequist,isRequistValidated}= require('../../validator/validata');
const { signin, signup, requireSignin } = require('../../controllers/admin/user');


const router = express.Router();
router.post('/admin/signup',validateSignupRequist,isRequistValidated, signup)
router.post('/admin/signin',validateSigninRequist,isRequistValidated, signin)
    /*
    router.post('/profile', requireSignin, (req, res) => {
        res.status(200).json({ user: 'profile' })
    })*/

module.exports = router;