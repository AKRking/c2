import mongoose from "mongoose";

const { Schema } = mongoose;

const topicSchema = new Schema(
  {
    title: { type: String, required: true },
    chapter_name: { type: String, required: true },
    chapter_number: { type: String, required: true },
    mini_description: { type: String, required: true },
    description: { type: Object, required: true },
    youtube_url: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.Topic || mongoose.model("Topic", topicSchema);
