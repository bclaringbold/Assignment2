var express = require('express');
var passport = require('passport');
var router = express.Router();

var User = require('../models/user');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { 
    title: 'Brad Claringbold',
    displayName: req.user ? req.user.displayName : ''
   });
});


/* Render Login page. */
router.get('/login', function (req, res, next) {
    if (!req.user) {
        res.render('login', {
            title: 'Login',
            messages: req.flash('loginMessage'),
            displayName: req.user ? req.user.displayName : ''
        });
    }
    else {
        return res.redirect('/users');
    }
});

/* Process the Login Request */
router.post('/login', passport.authenticate('local-login', {
    successRedirect: '/users',
    failureRedirect: '/login',
    failureFlash: true
}));


/* Process Logout Request */
router.get('/logout', function (req, res){
  req.logout();
  res.redirect('/');
});




/* GET about page. */
router.get('/about', function(req, res, next) {
  res.render('about', { title: 'About Me',
    displayName: req.user ? req.user.displayName : '' });
});

/* GET contact page. */
router.get('/contact', function(req, res, next) {
  res.render('contact', { title: 'Contact Me',
    displayName: req.user ? req.user.displayName : '' });
});

/* GET projects page. */
router.get('/projects', function(req, res, next) {
  res.render('projects', { title: 'Projects',
    displayName: req.user ? req.user.displayName : '' });
});

/* GET services page. */
router.get('/services', function(req, res, next) {
  res.render('services', { title: 'Services',
    displayName: req.user ? req.user.displayName : '' });
});

module.exports = router;
