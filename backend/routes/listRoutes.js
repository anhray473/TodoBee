import express from "express"
import List from "../models/List.js"

const router = express.Router();

//get all task list
router.get("/", async (req, res) => {
    const lists = await List.find();
    res.json(lists);
})

//add a new list
router.post('/', async (req, res) => {
    try {
        const list = new List(req.body);
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
        const list = await List.findByIdAndDelete(req.params.id);
        res.json({ message: `Deleted ${req.params.id}` })
    } catch (error) {
        res.status(400).json({ message: error.message }); 
    }
})

export default router;