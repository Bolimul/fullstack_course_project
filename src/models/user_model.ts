import mongoose from "mongoose";

export interface IUser {
    email: string;
    password: string;
    tokens: string[];
  }

const user_schema = new mongoose.Schema<IUser>({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    tokens: {
        type: [String]
    }
})
export default mongoose.model<IUser>("User", user_schema)