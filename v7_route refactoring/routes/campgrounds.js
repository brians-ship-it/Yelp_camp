var express     = require("express");
var router      = express.Router();
var Campground  = require("../models/campground");
var Comment     = require("../models/comment");

// Index - show all campgrounds
router.get("/", function(req, res){
    // get all campgrounds from db
    Campground.find({}, function(err, allCampgrounds){
        if(err) {
            console.log("Error");
        } else {
            res.render("campgrounds/index", {campgrounds: allCampgrounds});
        }
    });
});

router.post("/", function(req, res){
    // get data from form
    var name = req.body.name;
    var image= req.body.image;
    var desc = req.body.description;
    var newCampground = {name: name, image: image, description: desc};
    // add data to array
    
    // create a new campground and save to the db
    Campground.create(newCampground, function(err, newlycreated){
        if(err){
            console.log(err);
        } else {
            res.redirect("/campgrounds");
        }
    });
});

// show form to create new campground
router.get("/new", function(req, res) {
   res.render("campgrounds/new"); 
});

// show - shows more info about one campground
router.get("/:id", function(req, res) {
    // find the campground with the provided id
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err);
        } else {
        // render show tempalte with that campground
        res.render("campgrounds/show", {campground: foundCampground});
        }
    });
});

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router;