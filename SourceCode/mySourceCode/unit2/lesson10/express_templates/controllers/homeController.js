"use strict";

exports.sendReqParam = (req, res) => {
  let veg = req.params.vegetable;
  res.send(`This is the page for ${veg}`);
};

exports.respondWithName = (req, res) => { //Respond with a custom EJS view
  let theName = req.params.myName;  //Assign a local variable to a request parameter.
  res.render("index", { name: theName });  // Pass a local variable to a rendered view.
};
