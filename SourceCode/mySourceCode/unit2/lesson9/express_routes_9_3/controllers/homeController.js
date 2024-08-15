"use strict";

exports.sendReqParam = (req, res) => {
  let veg = req.params.vegetable;
  res.send(`This is the page for ${veg}`);
};

exports.postData=(req, res) => {
  console.log("req.body  ", req.body);
  console.log("req.query" , req.query);
  res.send("POST Successful!");
}