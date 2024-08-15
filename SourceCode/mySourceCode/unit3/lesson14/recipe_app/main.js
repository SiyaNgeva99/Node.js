"use strict";

const express = require("express"),
  app = express(),
  errorController = require("./controllers/errorController"),
  homeController = require("./controllers/homeController"),
  layouts = require("express-ejs-layouts"),
  mongoose = require("mongoose"),  //Require mongoose
  Subscriber = require("./models/subscriber");

mongoose.connect(
  "mongodb://localhost:27017/recipe_db", //Set up the connection to your database.
  { useNewUrlParser: true }
);
mongoose.set("useCreateIndex", true);
const db = mongoose.connection; //Assign the database to the db variable.

db.once("open", () => {  // Log a message when the application connects to the database. 
  console.log("Successfully connected to MongoDB using Mongoose!");
});

var subscriber1 = new Subscriber({
  name: "Jon1 Wexler",
  email: "jon1@jon1wexler.com"
}); //Instantiate a new subscriber.
subscriber1.save((error, savedDocument) => { //Save a subscriber to the database.
  if (error) console.log(error); //Pass potential errors to the next middleware function.
  console.log(savedDocument); //Log saved data document
});
Subscriber.create(
  {
    name: "Jon2 Wexler",
    email: "jon2@jon2wexler.com"
  },
  function (error, savedDocument) { //Create and save a subscriber in a single step.
    if (error) console.log(error);
    console.log(savedDocument);
  }
);

var myQuery = Subscriber.findOne({
  name: "Jon Wexler"
}).where("email", /wexler/);

myQuery.exec((error, data) => {
  if (data) console.log(data.name);
}); //Run a query with a callback function to handle errors and data.

app.set("port", process.env.PORT || 3000);
app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(layouts);
app.use(
  express.urlencoded({
    extended: false
  })
);
app.use(express.json());
app.use(homeController.logRequestPaths);

app.get("/name", homeController.respondWithName);
app.get("/items/:vegetable", homeController.sendReqParam);

app.post("/", (req, res) => {
  console.log(req.body);
  console.log(req.query);
  res.send("POST Successful!");
});

app.use(errorController.logErrors);
app.use(errorController.respondNoResourceFound);
app.use(errorController.respondInternalError);

app.listen(app.get("port"), () => {
  console.log(`Server running at http://localhost:${app.get("port")}`);
});
