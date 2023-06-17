import mongoose from "mongoose";

const { Schema } = mongoose;

const bookmarkSchema = new Schema(
  {
    user_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
    topic_id: { type: Schema.Types.ObjectId, ref: "Topic", required: true },
  },
  { timestamps: true }
);

export default mongoose.models.Bookmark ||
  mongoose.model("Bookmark", bookmarkSchema);
