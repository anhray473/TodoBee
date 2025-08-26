import mongoose from "mongoose";

const tagSchema = new mongoose.Schema({
    name: { type: String, require: true },
    color: { type: String }
})
export default mongoose.model.Tag || mongoose.model("Tag", tagSchema);
