const express = require("express");
const axios = require("axios");
let router = express.Router();

async function searchShow(searchTerm) {
  const { data } = await axios.get(
    `http://api.tvmaze.com/search/shows?q=${searchTerm}`
  );
  return data;
}
router.get("/", async (req, res) => {
  res.render("search/search");
});

router.post("/", async (req, res) => {
  const body = req.body;
  let errors = [];
  if (
    typeof body.searchTerm !== "string" ||
    !body.searchTerm.replace(/\s/g, "").length
  ) {
    errors.push("Search term must be text");
  }

  if (errors.length > 0) {
    res.render("search/search", {
      errors: errors,
      hasErrors: true,
    });
    return;
  }
  try {
    const results = await searchShow(body.searchTerm);
    res.render("search/searchList", {
      results: results,
      term: body.searchTerm,
    });
  } catch (e) {
    res.status(500).json({ error: e });
  }
});
module.exports = router;
