import mongoose from "mongoose";

const participantSchema = new mongoose.Schema({
  convoId: String,
  dogId: String,
});

const Participant = mongoose.model(
  "Participant",
  participantSchema,
  "Participants",
);

export default Participant;
