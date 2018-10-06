var express = require("express"),
app         = express(),
bodyParser  = require("body-parser"),
mongoose    = require("mongoose"),
Campground  = require("./models/campground"),
seedDB      = require("./seed"),
Comment     = require("./models/comment"),
passport    = require("passport"),
LocalStrategy = require("passport-local"),
User          = require("./models/user");

var campgroundRoutes = require("./routes/campgrounds");
var commentsRoutes   = require("./routes/comments");
var indexRoutes      = require("./routes/index");

mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
//app.use(express.bodyParser());
app.set("view engine", "ejs");
seedDB();

//PASSPORT CONFIGURATION
app.use(require("express-session") ({
    secret: "This could be anything",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next) {
    res.locals.currentUser = req.user;
    next();
});


app.use(campgroundRoutes);
app.use(indexRoutes);
app.use(commentsRoutes);


app.listen(3000, function() {
  console.log("App started");
});
