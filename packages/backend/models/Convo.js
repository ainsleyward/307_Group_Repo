import mongoose from "mongoose";

const convoSchema = new mongoose.Schema({
  convoId: String,
});

const Convos = mongoose.model("Convo", convoSchema, "Convos");

export default Convos;
