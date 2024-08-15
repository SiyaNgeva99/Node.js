"use strict";

const mongoose = require("mongoose"), // requires mongoose
  subscriberSchema = mongoose.Schema({
    name: String,
    email: String,
    zipCode: Number  //Defines the schema properties
  });

module.exports = mongoose.model("Subscriber", subscriberSchema); // Exports the model
