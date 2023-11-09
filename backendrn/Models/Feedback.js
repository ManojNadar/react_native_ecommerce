import mongoose, { Schema } from "mongoose";

const FeedbackSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
  },
});

export default mongoose.model("Feedback", FeedbackSchema);
