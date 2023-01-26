const express = require("express");
const router = express.Router();
const staffController = require("../controllers/staff");
const { ensureAuth } = require("../middleware/auth");

router.get("/", ensureAuth, staffController.getProfileStaff);
router.get("/tasksCompleted", staffController.getTasksCompleted);
router.post("/createNewTask/", staffController.createTask);
router.get("/createNewTask", staffController.getCreateTask);

router.put("/task/markComplete/:id", staffController.markComplete);

module.exports = router;
