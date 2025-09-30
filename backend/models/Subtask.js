import mongoose from "mongoose";

const subtaskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    completed: { type: Boolean, default: false },
    task: { type: mongoose.Schema.Types.ObjectId, ref: "Task" }
})
export default mongoose.models.Subtask || mongoose.model("Subtask", subtaskSchema);