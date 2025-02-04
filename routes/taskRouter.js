const express = require("express");
const taskRouter = express.Router();
const Todo = require("../models/todo.model");

taskRouter.get("/get", async (req, res) => {
  try {
    const todoData = await Todo.find({});
    res.send(todoData);
  } catch (err) {
    res.status(401).json({ message: "Error" + err });
  }
});

taskRouter.post("/add", async (req, res) => {
  try {
    const taskFromUser = req.body.task;
    const task = new Todo({ task: taskFromUser });
    const savedTask = await task.save();

    res.send(savedTask);
  } catch (err) {
    res.status(401).json("Error" + err);
  }
});

taskRouter.post("/delete", async (req, res) => {
  try {
    const taskId = req.body._id;
    const delTask = await Todo.findByIdAndDelete({ _id: taskId });
    res.send(delTask);
  } catch (err) {
    res.status(401).json("Error" + err);
  }
});

taskRouter.post("/edit", async (req, res) => {
  try {
    const { _id, task, completed } = req.body;
    const editedTask = await Todo.findByIdAndUpdate(
      _id,
      { task: task , completed: completed},
      { new: true }
    );
    res.send(editedTask);

    if (!editedTask) {
      return res.status(404).json({ message: "task not found" });
    }
  } catch (err) {
    res.status(401).json("ERROR" + err);
  }
});

module.exports = taskRouter;
