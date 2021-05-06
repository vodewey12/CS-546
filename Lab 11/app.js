const express = require("express");
const app = express();
const static = express.static(__dirname + "/public");
const Handlebars = require("handlebars");
const configRoutes = require("./routes");
const exphbs = require("express-handlebars");

app.use("/public", static);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
var hbs = exphbs.create({});

app.engine("handlebars", handlebarsInstance.engine);
app.set("view engine", "handlebars");
app.use(rewriteUnsupportedBrowserMethods);
configRoutes(app);

app.listen(3000, () => {
  console.log("We've now got a server!");
  console.log("Your routes will be running on http://localhost:3000");
});
