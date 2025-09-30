import mongoose, { Schema } from "mongoose";

const listSchema = new mongoose.Schema({
    name: { type: String, required: true },
    createAt: { type: Date, default: Date.now },
    tasks:[
        {type: mongoose.Schema.Types.ObjectId, ref:'Task'}
    ]
})
export default mongoose.models.List || mongoose.model("List", listSchema);
