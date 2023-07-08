import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  profilePicture: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    enum: ["Facebook", "Google", "Netflix", "General Assembly"],
    required: true,
  },
});

export const User = mongoose.model("User", userSchema);
