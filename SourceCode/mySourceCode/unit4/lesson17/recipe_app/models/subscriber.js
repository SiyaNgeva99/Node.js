"use strict";

const mongoose = require("mongoose");
const subscriberSchema = new mongoose.Schema({  //Define subscriberSchema to contain name, email, and zipCode properties
  name: {
    type: String,
    required: true  //validator
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true
  },
  zipCode: {
    type: Number,
    min: [10000, "Zip code too short"],   //Set up the zipCode property with a custom error message.
    max: 99999
  },
  courses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }] //square brackets means many coures
});

subscriberSchema.methods.getInfo = function() {  // Adds an instance method to get the full name of the subscriber
  return `Name: ${this.name} Email: ${this.email} Zip Code: ${this.zipCode}`;
};

subscriberSchema.methods.findLocalSubscribers = function() { //An instance method to find subscribers with the same ZIP code
  return this.model("Subscriber")
    .find({ zipCode: this.zipCode })
    .exec(); //Access the Subscriber model to use the find method
};

module.exports = mongoose.model("Subscriber", subscriberSchema);
