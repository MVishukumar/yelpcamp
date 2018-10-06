var express = require("express"),
    router  = express.Router(),
    Campground = require("../models/campground");

//================= CAMPGROUND ROUTS =================

router.get("/campgrounds", function(req, res) {
    console.log("Logged in user : ");
    console.log(req.user);
  Campground.find({}, function(err, cg) {
    if(err) {
      console.log("Something went wrong while reading data from db");
    } else {
      res.render("campgrounds/index", {campgrounds: cg, currentUser: req.user});
    }
  });

});

router.post("/campgrounds", function(req, res) {
  console.log(req.body);
  console.log("Name : " + req.body.name + ", " + "Image : " + req.body.image);
  var newCampObject = {
    name: req.body.name,
    image: req.body.image,
    description: req.body.description
  };

  Campground.create(newCampObject, function(err, cg) {
    if(err) {
      console.log("Error while inserting new campground to database");
    } else {
      console.log("New campground created");
      console.log(cg);
    }
  });

  res.redirect("campgrounds/campgrounds");
});

router.get("/campgrounds/new", function(req, res) {
  res.render("campgrounds/new");
});

router.get("/campgrounds/:id", function(req, res) {
  Campground.findById(req.params.id).populate("comments").exec(function(err, cg) {
    if(err) {
      console.log("Something went wrong while searching db for id " + req.params.id);
    } else {
      console.log(cg);
      res.render("campgrounds/show", {campgrounds: cg});
    }
  });
});

function isLoggedin(req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}

module.exports = router;
