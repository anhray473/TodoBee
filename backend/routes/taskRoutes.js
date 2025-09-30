import express from "express"
import Task from "../models/Task.js"
import List from "../models/List.js";

const router = express.Router();

//get all task list
router.get("/", async (req, res) => {
    const tasks = await Task.find();
    res.json(tasks);
})

//get task by list
router.get("/list/:id", async (req, res) => {
    try {
        const listID = req.params.id;
        const task = await Task.find({ listID });
        res.json(task);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

//add task
router.post("/", async (req, res) => {
    try {
        const task = new Task(req.body);
        await task.save();

        const updatedList = await List.findByIdAndUpdate(
            task.listID, // nếu schema là "list"
            { $push: { tasks: task._id } },
            { new: true }
        );

        if (!updatedList) {
            return res.status(404).json({ message: "List not found" });
        }

        res.status(201).json(task);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

//Đổi tình trạng task
router.patch("/:id/toggle", async (req, res) => {
    try {
        const task = await Task.findById(req.params.id)
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }
        task.completed = !task.completed;
        await task.save();
        res.json(task)

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

//update task
router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const update = req.body;
        const task = await Task.findByIdAndUpdate(id, update, { new: true });
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }
        res.json(task);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
})

//delete task
router.delete("/:id", async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);

        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        res.json({ message: "Task deleted successfully" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});



export default router;