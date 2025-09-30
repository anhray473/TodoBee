import mongoose from "mongoose";

const tagSchema = new mongoose.Schema({
    name: { type: String, required: true },
    color: { type: String }
})
export default mongoose.models.Tag || mongoose.model("Tag", tagSchema);
