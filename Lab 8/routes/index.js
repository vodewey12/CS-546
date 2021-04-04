const searchRoutes = require("./search");
const showsRoutes = require("./shows");
const path = require("path");
const constructorMethod = (app) => {
  app.use("/search", searchRoutes);
  app.use("/shows", showsRoutes);
  app.use("*", (req, res) => {
    res.sendStatus(404);
  });
};

module.exports = constructorMethod;
