import mongoose from "mongoose";

const listSchema = new mongoose.Schema({
    name: { type: String, require: true },
    createAt: { type: Date, default: Date.now }
})
export default mongoose.model.List || mongoose.model("List", listSchema);
