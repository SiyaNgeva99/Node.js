"use strict";

const Subscriber = require("../models/subscriber"); // require the subscriber model

exports.getAllSubscribers = (req, res) => { // gets all subscribers
  Subscriber.find({})
    .exec()
    .then(subscribers => {
      res.render("subscribers", {
        subscribers: subscribers
      });
    })
    .catch(error => {
      console.log(error.message);
      return [];
    })
    .then(() => {
      console.log("promise complete");
    });
};

exports.getSubscriptionPage = (req, res) => { // Renders the contact page
  res.render("contact");
};

exports.saveSubscriber = (req, res) => { // Saves the subscribers
  let newSubscriber = new Subscriber({
    name: req.body.name,
    email: req.body.email,
    zipCode: req.body.zipCode
  });
  newSubscriber
    .save()
    .then(() => {
      res.render("thanks");
    })
    .catch(error => {
      res.send(error);
    });
};
