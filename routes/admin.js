const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const homeController = require("../controllers/home");
const adminController = require("../controllers/admin");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Main Routes - simplified for now
// homepage
router.get("/", ensureAuth, adminController.getFeed);
router.get("/staff", adminController.getStaffFeed);
router.post("/createStaff", authController.createStaff);

// completed tasks page
router.get("/tasksCompleted", adminController.getTasksCompleted);


// ongoing tasks page
router.put("/assignJob/:id", adminController.assignJob);
router.get("/tasksOngoing", adminController.getTasksOngoing)

module.exports = router;
