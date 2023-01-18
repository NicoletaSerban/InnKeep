const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const homeController = require("../controllers/home");
const adminController = require("../controllers/admin");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Main Routes - simplified for now

router.get("/", ensureAuth, adminController.getFeed);
router.get("/staff", adminController.getStaffFeed);
router.get("/tasksCompleted", adminController.getTasksCompleted);
router.post("/createStaff", authController.createStaff);
router.put("/assignJob/:id", adminController.assignJob);

module.exports = router;