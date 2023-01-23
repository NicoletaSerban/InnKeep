const Task = require("../models/Task");
const Admin = require("../models/Admin");

module.exports = {
  getTasks: async (req, res) => {
    try {
      const task = await Task.findById(req.params.id);
      console.log(task);
      res.render("task.ejs", {});
    } catch (err) {
      console.log(err);
    }
  },

  getStaff: async (req, res) => {
    try {
      const tasks = await Task.find({ completedBy: req.user.id }).sort({
        createdAt: "asc",
      });

      res.render("profileStaff.ejs", { tasks: tasks, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },

  markComplete: async (req, res) => {
    try {
      await Task.findOneAndUpdate(
        { _id: req.params.id },
        {
          completed: true,
          doneDate: new Date(),
        }
      );
      console.log("Marked Complete");
      res.redirect(`/staff/`);
    } catch (err) {
      console.log(err);
    }
  },

  createTask: async (req, res) => {
    try {
      await Task.create({
        title: req.body.title,
        description: req.body.description,
        location: req.body.location,
        importance: req.body.importance,
        category: req.body.category,
        createdDate: new Date(),
        completed: false,
        adminId: req.user.adminId,
      });
      console.log("Task has been added!");
      res.redirect("/staff/");
    } catch (err) {
      console.log(err);
    }
  },
  getCreateTask: async (req, res) => {
    const admin = await Admin.findById(req.user.adminId);
    console.log(admin);
    try {
      res.render("createNewTask.ejs", { user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
};
