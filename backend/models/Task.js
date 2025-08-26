import mongoose from "mongoose"

const taskSchema = new mongoose.Schema({
    title: { type: String, require: true },
    description: { type: String },
    createAt: { type: Date, default: Date.now },
    dueDate: { type: Date, default: Date.now },
    completed: { type: Boolean, default: false },
    list: { type: mongoose.Schema.Types.ObjectId, ref: "List" },
    tag: { type: mongoose.Schema.Types.ObjectId, ref: "Tag" },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
})

export default mongoose.model.Task || mongoose.model("Task", taskSchema);
