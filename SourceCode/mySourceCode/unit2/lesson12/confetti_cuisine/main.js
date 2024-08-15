"use strict";

const express = require("express"),  //Require express.
  app = express(),  // Instantiate the express application
  homeController = require("./controllers/homeController"),
  errorController = require("./controllers/errorController"),
  layouts = require("express-ejs-layouts"); //require the express-ejs-layouts

app.set("view engine", "ejs");
app.set("port", process.env.PORT || 3000);  
app.use(
  express.urlencoded({  // Tell the Express.js app to use body-parser for processing URL-encoded and JSON parameters.
    extended: false 
  })
);
app.use(express.json());
app.use(layouts); // makes it use the layout module
app.use(express.static("public"));

app.get("/", (req, res) => {  // A route for the home page
  res.render("index");
});

app.get("/courses", homeController.showCourses);
app.get("/contact", homeController.showSignUp);  // Routes
app.post("/contact", homeController.postedSignUpForm);

app.use(errorController.pageNotFoundError);  // error handlers are middleware functions
app.use(errorController.internalServerError);

app.listen(app.get("port"), () => { // makes the application listen on port 3000
  console.log(`Server running at http://localhost:${app.get("port")}`);
});
