import mongoose from "mongoose";

const subtaskSchema = new mongoose.Schema({
    title: { type: String, require: true },
    completed: { type: Boolean, default: false },
    task: { type: mongoose.Schema.Types.ObjectId, ref: "Task" }
})
export default mongoose.model.Subtask || mongoose.model("Subtask", subtaskSchema);