"use strict";

const port = 3000,
  express = require("express"), // Add the express module to your application.
  app = express(); // Assign the express application to the app constant.
app
  .get("/", (req, res) => { //Set up a GET route for the home page.
    console.log("req params", req.params);
    console.log("req body", req.body);
    console.log("req url", req.url);
    console.log("req query", req.query); 
    res.send("Hello, Universe!"); //Issue a response from the server to the client with res.send.
  })
  .listen(port, () => {
    console.log(`The Express.js server has started and is listening on port number: ${port}`);
  }); //  Set up the application to listen at port 3000.

