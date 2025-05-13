import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  image: String,
  firstName: String, 
  lastName: String,
  email: String,
  password: String, // store as a hash!
  age: Number,
  gender: String,
  city: String,
  tags: {
    type: [String],
    validate: [val => val.length === 3, 'Must have exactly 3 tags']
  },
  bio: String,
  dogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Dog"
    }
  ]
});

const User = mongoose.model("User", userSchema, "Users");
export default User;
