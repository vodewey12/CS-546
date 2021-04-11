const express = require("express");
let router = express.Router();
const data = require("../data");
const fibonacci = data.fibonacci;
let inputs = [];
router.get("/", async (req, res) => {
  res.render("fib/server");
});

router.post("/", async (req, res) => {
  const body = req.body;
  let errors = [];
  if (!body.index.replace(/\s/g, "").length) {
    errors.push("There must be a number");
  }
  if (errors.length > 0) {
    res.render("fib/server", {
      errors: errors,
      hasErrors: true,
    });
    return;
  }
  let number = parseInt(body.index);

  try {
    const result = fibonacci.findFibonacci(number);
    if (fibonacci.checkPrime(result)) {
      inputs.push({ index: number, fib: result, class: "is-prime" });
      res.render("fib/server", {
        prime: true,
        index: number,
        result: result,
        results: inputs,
      });
    } else {
      inputs.push({ index: number, fib: result, class: "not-prime" });
      res.render("fib/server", {
        prime: false,
        index: number,
        result: result,
        results: inputs,
      });
    }
  } catch (e) {
    res.status(500).json({ error: e });
  }
});
module.exports = router;
