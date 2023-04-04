import mongoose from "mongoose";
//import userSchema from "../schemas/userSchema.js";

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true, collection: "users", validateBeforeSave: true }
);

const User = mongoose.model("User", userSchema)

export default User;
