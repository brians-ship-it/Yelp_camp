var express     = require("express");
var router      = express.Router();
var passport    = require("passport");
var User        = require("../models/user");

router.get("/", function(req, res){
    res.render("landing");
});

// ======================
// Authentications routes
router.get("/register", function(req, res){
    res.render("register");
});

// handle singup logic
router.post("/register", function(req, res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            return res.render("register", {"error": err.message});
        }
        passport.authenticate("local")(req, res, function(){
            req.flash("success", "Welcome to YelpCamp " + user.username);
            res.redirect("/campgrounds");
        });
    });
});

// SHOW LOGIN FORM
router.get("/login", function(req, res){
    res.render("login");
});

// handeling login logic
router.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/campgrounds" ,
        failureRedirect: "/login"
    }), function(req, res){

});

// Logout Logic
router.get("/logout", function(req, res){
    req.logout();
    req.flash("success", "Logged you out!");
    res.redirect("/campgrounds");
});

module.exports = router;