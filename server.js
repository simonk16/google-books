const express = require('express');
const path = require("path");
const logger = require("morgan");
const routes = require("./routes");
const PORT = process.env.PORT || 3001;
const app = express();
const mongoose = require("mongoose");

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(logger("dev"));
app.use(express.json());

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}
// Routes
require("./routes/api/apiRoutes")(app)
app.use(routes)
// Send every other request to the React app
// Define any API routes before this runs
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});


app.listen(PORT, () => {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});

mongoose.connect(process.env.MONGODB_URI || "mongodb://user1:Password1@ds229648.mlab.com:29648/heroku_ssnczpxx", { useNewUrlParser: true })