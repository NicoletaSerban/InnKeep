const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  location: {
    type: String,
    require: true,
  },
  importance: {
    type: String,
    require: true,
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
  category: {
    type: String,
    require: true,
  },
  assignedDate: {
    type: Date,
  },
  doneDate: {
    type: Date,
  },
  completed: {
    type: Boolean,
    required: true,
  },
  completedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Staff",
  },
  adminId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Admin",
  },
});

module.exports = mongoose.model("Task", TaskSchema);
