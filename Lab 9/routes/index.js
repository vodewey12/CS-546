const fibRoute = require("./fibonacci");
const path = require("path");
const constructorMethod = (app) => {
  app.use("/", fibRoute);
  app.use("*", (req, res) => {
    res.sendStatus(404);
  });
};

module.exports = constructorMethod;
