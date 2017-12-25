const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

app.use(bodyParser.json());

// app.use(
//   cookieSession({
//     maxAge: 30 * 24 * 60 * 60 * 1000,
//     keys: "this is a key"
//   })
// );

app.get("/api/", (req, res) => {
  res.send({ greeting: "hello" });
});

//Production deployment
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  const path = require("path");

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT);
