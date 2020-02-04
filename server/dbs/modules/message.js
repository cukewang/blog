import mongoose from "mongoose";
const messageSchema = new mongoose.Schema({
  username: String,
  date: {
    type: Date,
    default: new Date()
  },
  content: String,
  email: String,
  web: String,
  comments: [
    {
      username: String,
      replyname: String,
      date: {
        type: Date,
        default: new Date()
      },
      email: String,
      web: String,
      content: String
    }
  ]
});

export default mongoose.model("message", messageSchema);
