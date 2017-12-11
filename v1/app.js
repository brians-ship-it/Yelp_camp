var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

app.get("/", function(req, res){
    res.render("landing");
});

var campgrounds = [
    {name: "Salmon Creek", image: "https://www.campamerica.co.uk/images/uploads/images/Private-Camp---Camp-Westmont-1400-x-610.png"},
    {name: "Riverside", image: "https://www.autostraddle.com/wp-content/uploads/2012/03/camp-tent.jpg"},
    {name: "Mountain road", image: "http://cdn.skim.gs/image/upload/v1456338931/msi/summer-camp-sign_ht8jdq.jpg"},
]

app.get("/campgrounds", function(req, res){
    res.render("campgrounds", {campgrounds: campgrounds});
});

app.post("/campgrounds", function(req, res){
    // get data from form
    var name = req.body.name;
    var image= req.body.image;
    var newCampground = {name: name, image: image};
    // add data to array
    campgrounds.push(newCampground);
    // redirect back to campgrounds
    res.redirect("/campgrounds");
});

app.get("/campgrounds/new", function(req, res) {
   res.render("new"); 
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Yelpv1");
});