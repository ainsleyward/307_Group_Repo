import mongoose from "mongoose";

const dogSchema = new mongoose.Schema({
  name: String,
  age: Number,
  breed: String,
  bio: String,
  image: String, // image URL
});

const Dog = mongoose.model("Dog", dogSchema, "Dogs");

export default Dog;