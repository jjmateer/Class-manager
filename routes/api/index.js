const router = require("express").Router();
const authRoutes = require("./auth.js");
const studentRoutes = require("./student");

router.use("/auth", authRoutes);
router.use("/student", studentRoutes);
module.exports = router;
