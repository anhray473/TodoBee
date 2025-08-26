import express from "express"
import Task from "../models/Task.js"

const router = express.Router();

//get all task list
router.get("/", async (req, res) => {
    const tasks = await Task.find();
    res.json(tasks);
})

export default router;