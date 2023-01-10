let express = require("express");
const { process_params } = require("express/lib/router");
require("dotenv").config();

let app = express();

app.use("/public", express.static(__dirname + "/public"));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/json", (req, res) => {
  let msg = {
    message: "Hello json",
  };

  if (process.env.MESSAGE_STYLE === "uppercase") {
    msg.message = msg.message.toUpperCase();
  }
    res.json(msg);
});

module.exports = app;
