let express = require("express");
const { process_params } = require("express/lib/router");
require("dotenv").config();

let app = express();

app.use((req, res, next) => {
  const str = `${req.method} ${req.path} - ${req.ip}`;
  console.log(str);
  next();
});

app.use("/public", express.static(__dirname + "/public"));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/json", (req, res) => {
  let msg = { message: "Hello json" };
  if (process.env.MESSAGE_STYLE === "uppercase") {
    msg.message = msg.message.toUpperCase();
  }
  res.json(msg);
});

app.get("/now", (req, res, next) => {
    req.time = new Date().toString();
    next();
  },
  (req, res) => {
    res.json({ time: req.time });
  }
);

module.exports = app;
