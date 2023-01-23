const Task = require("../models/Task");
const Staff = require("../models/Staff");

module.exports = {
  getFeed: async (req, res) => {
    try {
      const tasks = await Task.find({
        completedBy: null,
        adminId: req.user.id,
      }).sort({ createdDate: "desc" });
      const activeStaff = await Staff.find({
        role: "staff",
        adminId: req.user.id,
      });
      if (req.user.role === "admin") {
        res.render("profileAdmin.ejs", {
          tasks: tasks,
          user: req.user,
          staff: activeStaff,
        });
      } else {
        res.redirect("/staff");
      }
    } catch (err) {
      console.log(err);
    }
  },

  getStaffFeed: async (req, res) => {
    try {
      // finding all the staff with the associed id
      const staffMembers = await Staff.find({ adminId: req.user.id });
      console.log(staffMembers);
      // rendering profile page with the data from the DB
      if (req.user.role === "admin") {
        res.render("adminStaffMenu.ejs", { staff: staffMembers });
      }
    } catch (err) {
      console.log(err);
    }
  },

  getTasksCompleted: async (req, res) => {
    try {
      const tasks = await Task.find({ completed: true }).sort({
        createdDate: "desc",
      });
      console.log(tasks);
      const staff = [];
      for (task of tasks) {
        console.log(task.completedBy);
        staff.push(await Staff.findById(task.completedBy));
      }
      console.log(staff);
      if (req.user.role === "admin") {
        res.render("profileAdminDone.ejs", {
          tasks: tasks,
          user: req.user,
          staff: staff,
        });
      } else {
        res.redirect("/staff");
      }
    } catch (err) {
      console.log(err);
    }
  },
  assignJob: async (req, res) => {
    try {
      await Task.findOneAndUpdate(
        { _id: req.params.id },
        {
          completedBy: req.body.assign,
          assignedDate: new Date(),
        }
      );
      console.log(`Assigned to ${req.body.assign}`);
      res.redirect(`/admin/`);
    } catch (err) {
      console.log(err);
    }
  },
};
