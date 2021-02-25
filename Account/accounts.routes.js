const express = require("express");
const router = express.Router();
const accountService = require("./accounts.helpers");

router.post("/authenticate", authenticate);

function authenticate(req, res) {
  console.log(req.body, "account route");
  const { email, password } = req.body;
  accountService.authenticate({ email, password }).then((account) => {
    res.json(account);
  });
}

module.exports = router;
