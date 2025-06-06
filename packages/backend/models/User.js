import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  image: {
    type: String,
    default: "",
  },
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    match: [/\S+@\S+\.\S+/, "Invalid email"],
  },
  password: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    min: 0,
  },
  gender: {
    type: String,
    enum: ["M", "F", "Other"],
  },
  city: {
    type: String,
    trim: true,
  },
  tags: {
    type: [String],
    validate: {
      validator: (val) => !val || val.length === 3,
      message: "Must have exactly 3 tags",
    },
    default: undefined,
  },
  bio: {
    type: String,
    maxlength: 500,
  },
  dogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Dog",
    },
  ],
});

const User = mongoose.model("User", userSchema, "Users");
export default User;
