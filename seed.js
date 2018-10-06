var mongoose = require("mongoose");
var Cg = require("./models/campground");
var Comment = require("./models/comment");

var campgrounds = [
  {
    name: "Salmon Creek",
    image: "https://cdn.pixabay.com/photo/2016/01/19/16/48/teepee-1149402__340.jpg",
    description: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc."
  },
  {
    name: "Granite Hill",
    image: "https://cdn.pixabay.com/photo/2016/11/21/14/31/vw-bus-1845719__340.jpg",
    description: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc."
  },
  {
    name: "Mountain Goat's Rest",
    image: "https://cdn.pixabay.com/photo/2016/11/22/23/08/adventure-1851092__340.jpg",
    description: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc."
  }
];

function seedDB() {
  Cg.remove({}, function(err) {
    if(err) {
      console.log("Error while cleaning data");
    } else {
      console.log("Successfully cleaned the data");

      campgrounds.forEach(function(tempObj) {
        Cg.create(tempObj, function(err, mcg) {
          console.log("Crated " + mcg);

          Comment.create(
            {
              text: "This is a great place",
              author: "Vishu"
            }, function(err, newComment) {
              if(err) {
                console.log("Error while creating comment");
              } else {
                mcg.comments.push(newComment);
                mcg.save();
              }
          });

        });
      });
    }
  });
}

module.exports = seedDB;
