const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passport = require("passport");
const cookieSession = require("cookie-session");
const http = require("http");
const socketIo = require("socket.io");
const key = require("./config/key");

require("./models/User");
//Wallet
require("./models/Wallet");
require("./models/Transaction");
require("./models/ReferenceOutput");
require("./models/Admin");

require("./services/passport");

const app = express();

//Socket IO
const server = http.Server(app);
const io = socketIo(server);

io.on("connection", socket => {
  socket.emit("INIT", { hello: "FK U" });
});

//WEB SOCKET
require("./services/webSocket")(io);

mongoose.connect(key.mongoURI);

app.use(bodyParser.json());

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [key.cookieKey]
  })
);

//OAuth
app.use(passport.initialize());
app.use(passport.session());

//Routes
require("./routes/authRoute")(app);
require("./routes/userRoute")(app);
require("./routes/adminRoute")(app);
require("./routes/transactionRoute")(app);
require("./routes/systemRoute")(app);

//Production deployment
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  const path = require("path");

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;
server.listen(PORT);
