import mongoose from "mongoose";

const dogSchema = new mongoose.Schema({
  name: String,
  age: Number,
  breed: String,
  gender: String,
  bio: String,
  image: String,
  imgId: String,
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  tags: {
    type: [String],
  },
  prompts: [
    {
      question: String,
      answer: String
    }
  ]
});

const Dog = mongoose.model("Dog", dogSchema, "Dogs");

export default Dog;
