var express  = require("express"),
    router   = express.Router(),
    User     = require("../models/user"),
    passport = require("passport");


//================= AUTH ROUTES =================

router.get("/", function(req, res) {
  res.render("landing");
});

router.get("/register", function(req, res) {
    res.render("register");
});

router.post("/register", function(req, res) {
    console.log(req.body);
    var newUser = new User({
        username: req.body.username,
        password: req.body.password
    });
    User.register(newUser, req.body.password, function(err, newuser) {
        if(err) {
            console.log("Error while registering user");
            console.log(err);
            return res.render("register");
        }
        console.log("No error");
        passport.authenticate("local")(req, res, function() {
            console.log(req);
            res.redirect("/campgrounds");
        });
    });
});

router.get("/login", function(req, res) {
    res.render("login");
});

router.post("/login", passport.authenticate("local", {
        successRedirect: "/campgrounds",
        failureRedirect: "/login"
    }), function(req, res) {
        console.log(req.body.username);
        console.log(req.body.password);
        res.send("Login validation page");
});

router.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/campgrounds");
});

function isLoggedin(req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}

module.exports = router;
