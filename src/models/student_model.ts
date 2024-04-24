import mongoose from "mongoose";

 export interface IStudent {
  name: string;
  _id: string;
  imgUrl: string;
}

const studentSchema = new mongoose.Schema<IStudent>({
  name: {
    type: String,
    required: true,
  },
  _id: {
    type: String,
    required: true,
  },
  imgUrl: {
    type: String,
    required: true,
  },
});

export default mongoose.model<IStudent>("Student", studentSchema);
