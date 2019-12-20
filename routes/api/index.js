const router = require("express").Router();
const authRoutes = require("./auth.js");
const studentRoutes = require("./student");
const curriculumRoutes = require("./curriculum");

router.use("/auth", authRoutes);
router.use("/student", studentRoutes);
router.use("/curriculum", curriculumRoutes);
module.exports = router;
