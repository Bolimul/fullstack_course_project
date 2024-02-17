import mongoose from "mongoose";

const post_schema = new mongoose.Schema({
    creator_id: {
        type: String,
        required: true
    },
    post_title: {
        type: String,
        required: true
    },
    post_text: {
        type: String,
        required: true
    }

})
export default mongoose.model("Post", post_schema)