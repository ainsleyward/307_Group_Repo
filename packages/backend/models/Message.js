import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  messageId: String,
  convoId: String,
  participantId: String,
  date: { type: Date, default: Date.now },
  text: String,
});

const Messages = mongoose.model("Message", messageSchema, "Messages");

export default Messages;
