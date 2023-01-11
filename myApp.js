let express = require("express");
const { process_params } = require("express/lib/router");
require("dotenv").config();

let app = express();

app.use((req, res, next) => {
  const reqInfo = `${req.method} ${req.path} - ${req.ip}`;
  console.log(reqInfo);
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

// https://simeon-boilerplate-express.onrender.com/freecodecamp/echo
app.get("/:word/echo", (req, res) => {
    if (!echo) {
        res.sendStatus(404);
        return;
    }
    res.json({echo: req.params.word});
});

// https://simeon-boilerplate-express.onrender.com/name?first=Mick&last=Jagger
app.get("/name", (req, res) => {
    if (!req.query.first || !req.query.last) {
        res.sendStatus(400);
    }
    let fullName = `${req.query.first} ${req.query.last}`;
    res.json({name: fullName});
});

module.exports = app;
