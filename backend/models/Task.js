import mongoose from "mongoose"

const taskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    createAt: { type: Date, default: Date.now },
    completed: { type: Boolean, default: false },
    listID: { type: mongoose.Schema.Types.ObjectId, ref: "List" },
    tagID: { type: mongoose.Schema.Types.ObjectId, ref: "Tag" },
    userID: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
})

export default mongoose.models.Task || mongoose.model("Task", taskSchema);
