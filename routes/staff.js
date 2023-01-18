const express = require("express");
const router = express.Router();
const tasksController = require("../controllers/tasks");
const { ensureAuth } = require('../middleware/auth')

router.get('/', ensureAuth, tasksController.getStaff)
router.get("/task/:id", tasksController.getTasks);
router.post("/createNewTask/", tasksController.createTask);
router.get("/createNewTask", tasksController.getCreateTask);

router.put("/task/markComplete/:id", tasksController.markComplete);



module.exports = router;
