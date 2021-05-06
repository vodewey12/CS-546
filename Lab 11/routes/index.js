const path = require("path");
const constructorMethod = (app) => {
  app.get("/", async (req, res) => {
    res.render("shows/index");
  });
  app.use("*", (req, res) => {
    res.sendStatus(404);
  });
};

module.exports = constructorMethod;
