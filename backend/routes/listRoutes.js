import express from "express"
import List from "../models/List.js"
import Task from "../models/Task.js"


const router = express.Router();

//get all list
router.get("/", async (req, res) => {
    const lists = await List.find();
    res.json(lists);
})

//get all task by list
router.get("/:id", async (req, res) => {
    try {
        const list = await List.findById(req.params.id).populate("tasks");
        res.json(list);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
})

//add a new list
router.post('/', async (req, res) => {
    try {
        const list = new List(req.body);
        console.log(list);
        await list.save();
        res.status(201).json(list);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
})

//update list
router.put("/:id", async (req, res) => {
    try {
        const list = await List.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(list)
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
})

//delete a list
router.delete("/:id", async (req, res) => {
    try {
        const listID = req.params.id
        await List.findByIdAndDelete(listID);
        await Task.deleteMany({ listID: listID });
        res.json({ message: `Deleted ${listID}` })
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
})

export default router;