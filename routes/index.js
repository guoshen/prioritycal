'use strict';
var express = require('express');
var router = express.Router();
var gcal     = require('google-calendar');

// GET: /
/*router.get('/', function(req, res) {
  res.render('index/index', {
    title: 'Welcome to Priority Calendar'
  });
});*/

router.get('/', function(req, res){
  if(!req.session.access_token) return res.redirect('/auth');
  var accessToken = req.session.access_token;
  gcal(accessToken).calendarList.list(function(err, data) {
    if(err) return res.send(500,err);
    return res.send(data);
  });
  
  
});
  

module.exports = router;
