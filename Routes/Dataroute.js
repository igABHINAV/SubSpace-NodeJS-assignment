const express = require("express");
const {  processData, Getdata } = require("../Controllers/DataController");
const router = express.Router();
router.route("/api/blog-stats").get(processData);
router.route("/api/blog-search").get(Getdata);
module.exports = router;