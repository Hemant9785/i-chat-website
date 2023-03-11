const express = require("express");
const { accessChats, fetchChats } = require("../controllers/chatControllers");
const protect = require("../middlewares/protect");

const router = express.Router();

router.route("/").post(protect, accessChats);
router.route("/").get(protect, fetchChats);
module.exports = router;
