const express = require("express");
const router = express.Router();

const { getHome, getBranches, getCommits } = require("../controllers");
/* GET home page. */
router.get("/", getHome);
router.get("/branches", getBranches);
router.get("/commits", getCommits);

module.exports = router;
