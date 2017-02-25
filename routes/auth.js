'use strict';
var express = require('express');
var router = express.Router();
var passport= require('passport');

router.route('/google/callback').get(passport.authenticate('google', {
successRedirect:'/users/',
    failure:'/error/',
}));


router.route('/google').get(passport.authenticate('google', {scope:
    ['https://www.googleapis.com/auth/userinfo.profile', 'https://www.googleapis.com/auth/userinfo.email']}));
// GET: /
module.exports = router;