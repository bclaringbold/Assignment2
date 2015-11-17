var express = require('express');
var passport = require('passport');
var router = express.Router();

var reg = require('../models/register');


/* Utility functin to check if user is authenticatd */
function requireAuth(req, res, next){

  // check if the user is logged in
  if(!req.isAuthenticated()){
    res.redirect('/login');
  }
  next();
}

/* Show Registration Page */
router.get('/', requireAuth, function (req, res, next) {
    if (!req.user) {
        res.render('register', {
            title: 'Add New User',
            messages: req.flash('registerMessage'),
            displayName: req.user ? req.user.displayName : ''
        });
    }
    else {
        return res.redirect('/');
    }
});

/* POST signup data. */
router.post('/register', passport.authenticate('local-registration', {
    //Success go to Profile Page / Fail go to Signup page
    successRedirect : '/users',
    failureRedirect : '/register',
    failureFlash : true
}));

module.exports = router;
