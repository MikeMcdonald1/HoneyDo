// routers decide WHERE to go, and controllers decide WHAT to do
const express = require("express");
const router = express.Router();

const { register, login } = require("../controllers/auth.js");

router.post("/register", register);
router.post("/login", login);

module.exports = router;
