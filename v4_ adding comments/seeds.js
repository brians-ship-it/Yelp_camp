var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
    {
        name: "Clouds rest",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQO4V1m3Ylx1pIG3wWoiSX8F75dvVUn-D_e167m5e4l2nZs8XR2",
        description: "blablabla"
    },
    {
        name: "Deserts rest",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrGFzwxrJC_dgUFvgPp5pdK2MHH45XQIOT3TgN-1CqUm-qWoe6",
        description: "blablabla"
    },
    {
        name: "Forests rest",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQP9HLpYFat10khbdl4PjTS3RdeHoyU8ZGUoYV5V_xkW1VXFZinLA",
        description: "blablabla"
    }
]
function seedDB(){
    // Remove all campgrounds
    Campground.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("Removed campgrounds!");
        // add a few campgrounds
        data.forEach(function(seed){
            Campground.create(seed, function(err, campground){
                if(err){
                    console.log(err);
                } else {
                   console.log("added a new campground"); 
                //   create a comment
                    Comment.create(
                        {
                            text: "this place is coooool",
                            author: "Bob"
                        }, function(err, comment){
                            if(err){
                                console.log(err);
                            } else {
                                campground.comments.push(comment);
                                campground.save();
                                console.log("created comment");
                            }
                        });
                }
            });
        });
    });
    // add a few comments
}
module.exports = seedDB;