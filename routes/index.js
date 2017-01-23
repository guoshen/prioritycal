'use strict';
var express = require('express');
var router = express.Router();

// GET: /
router.get('/', function(req, res) {
  res.render('index/index', {
    title: 'Welcome to Priority Calendar'
  });
});

module.exports = router;
