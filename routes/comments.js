var express    = require("express"),
    router     = express.Router(),
    Campground = require("../models/campground"),
    Comment    = require("../models/comment");


//================= COMMENT ROUTS =================

router.get("/campgrounds/:id/comments/new", isLoggedin, function(req, res) {
  Campground.findById(req.params.id, function(err, tempObj) {
    if(err) {
      console.log("Error, couldn't find object with id " + req.params.id);
    } else {
      console.log("Found object for id " + req.params.id);
      console.log(tempObj);
      res.render("comments/new", {campgroundObj: tempObj});
    }
  });
});

router.post("/campgrounds/:id/comment", isLoggedin, function(req, res) {
  console.log(req.params);
  Campground.findById(req.params.id, function(err, tempObj) {
    if(err) {
      console.log("Error");
      res.redirect("campgrounds/campgrounds");
    } else {
      console.log("===========");
      console.log(tempObj);
      console.log("===========");
      Comment.create(req.body.comment, function(err, tempComment) {
        if(err) {
          console.log("Couldn't save comment");
        } else {
          tempObj.comments.push(tempComment);
          tempObj.save();
          res.redirect("/campgrounds/" + tempObj._id);
        }
      });

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
