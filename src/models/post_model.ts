import mongoose from "mongoose";

export interface IPost {
    creator_id: string;
    post_title: string;
    post_text: string;
    imgUrl: string
  }

const post_schema = new mongoose.Schema<IPost>({
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
    },
    imgUrl: {
        type: String,
        required: true
    }

})
export default mongoose.model<IPost>("Post", post_schema)