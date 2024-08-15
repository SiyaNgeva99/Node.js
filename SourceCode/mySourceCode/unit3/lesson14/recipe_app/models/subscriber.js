"use strict";

const mongoose = require("mongoose"),
  subscriberSchema = mongoose.Schema({ //Create a new schema with mongoose.Schema.
    name: String,
    email: String, // these are Schema properties
    zipCode: Number 
  });

module.exports = mongoose.model("Subscriber", subscriberSchema);
