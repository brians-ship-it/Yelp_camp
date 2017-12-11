var express     = require("express");
var router      = express.Router();
var Campground  = require("../models/campground");
var Comment     = require("../models/comment");
var middleware  = require("../middleware");

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

router.post("/", middleware.isLoggedIn, function(req, res){
    // get data from form
    var name = req.body.name;
    var image= req.body.image;
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var desc = req.body.description;
    var newCampground = {name: name, image: image, description: desc, author: author};
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
router.get("/new", middleware.isLoggedIn, function(req, res) {
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

// edit campgrounds route
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res) {
    Campground.findById(req.params.id, function(err, foundCampground){
        res.render("campgrounds/edit", {campground: foundCampground});            
    }); 
});

// update campgrounds route
router.put("/:id", middleware.checkCampgroundOwnership, function(req, res){
    // find and update the correct campground
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
        if (err) {
                        console.log(err)
            res.redirect("/campgrounds");
        } else {
        // redirect somewhere (to the show page)
            res.redirect("/campgrounds/" + req.params.id);
        }  
    });
});

// destroy campground
router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res){
    Campground.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/campgrounds");
        } else {
            res.redirect("/campgrounds");
        }
    });
});

module.exports = router;