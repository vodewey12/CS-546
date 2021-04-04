const express = require("express");
const axios = require("axios");
let router = express.Router();

async function getShowsbyId(id) {
  if (typeof id != "number" && id <= 0) {
    throw "Invalid id";
  }
  const { data } = await axios.get(`http://api.tvmaze.com/shows/${id}`);
  return data;
}
async function getShows() {
  const { data } = await axios.get("http://api.tvmaze.com/shows");
  return data;
}

router.get("/:id", async (req, res) => {
  try {
    const data = await getShowsbyId(req.params.id);
    const strippedString = data.summary.replace(/(<([^>]+)>)/gi, "");
    data.summary = strippedString;
    res.render("shows/show", { show: data });
  } catch (e) {
    res.status(404).json({
      error: "No show with that Id",
    });
  }
});

module.exports = router;
