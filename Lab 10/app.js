const express = require("express");
const static = express.static(__dirname + "/public");
const session = require("express-session");
const exphbs = require("express-handlebars");
const bcrypt = require("bcryptjs");
const users = require("./data/user");
const app = express();

app.use("/public", static);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    name: "AuthCookie",
    secret: "some secret string!",
    resave: false,
    saveUninitialized: true,
  })
);

app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");

//Logger
let logger = (req, res, next) => {
  let isAuth = "Non-Authenticated User";
  if (req.session.user) {
    isAuth = "Authenticated User";
  }
  let datetime = new Date().toUTCString();
  let method = req.method;
  let url = req.url;
  let log = `[${datetime}] ${method}:${url} (${isAuth}) `;
  console.log(log);
  next();
};
app.use(logger);

//Routes and Stuff
app.get("/", (req, res) => {
  if (!!req.session.user) {
    return res.redirect("/private");
  } else {
    return res.render("login", {
      title: "Login",
    });
  }
});

app.use("/private", (req, res, next) => {
  if (!req.session.user) {
    return res.redirect("/");
  } else {
    next();
  }
});

app.get("/private", (req, res) => {
  return res.render("private", {
    title: "User",
    user: req.session.user,
  });
});
app.post("/login", (req, res) => {
  const body = req.body;
  let user = {};
  if (!req.session.user) {
    for (let i in users) {
      if (
        body.username == users[i].username &&
        bcrypt.compareSync(body.password, users[i].hashedPassword)
      ) {
        user = {
          username: users[i].username,
          alias: users[i].alias,
          firstName: users[i].firstName,
          lastName: users[i].lastName,
          profession: users[i].profession,
          bio: users[i].bio,
        };
        req.session.user = user;
      }
    }
  }
  if (Object.keys(user).length !== 0) {
    return res.redirect("/private");
  } else {
    res.status(401);
    return res.render("login", {
      title: "Login",
      message: "Did not provide a valid username/password",
    });
  }
});

app.get("/logout", async (req, res) => {
  req.session.destroy(function (err) {
    res.redirect("/");
  });
});

app.use("*", (req, res) => {
  res.sendStatus(404);
});
app.listen(3000, () => {
  console.log("We've now got a server!");
  console.log("Your routes will be running on http://localhost:3000");
});
