import mongoose from "mongoose";

const matchSchema = new mongoose.Schema({
  swiperDogId: String,
  targetDogId: String,
});

const Match = mongoose.model("Match", matchSchema, "Matches");

export default Match;
