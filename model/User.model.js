import mongoose from "mongoose";

const loginSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
      trim: true, // Cleans up accidental whitespaces on registration
    },

    lastname: {
      type: String,
      default: "",
    },

    email: {
      type: String,
      lowercase: true,
      unique: true,
      sparse: true, // Safely allows null values for alternative login configurations
      match: /^\S+@\S+\.\S+$/,
    },

    password: {
      type: String,
      required: true,
      // Note: Kept at 8 here to match your model constraints, 
      // but remember your User.controller.js checks for length < 6. 
      // Keeping it at 8 here acts as an excellent, tighter database security gate!
      minlength: 8, 
    },
  },
  {
    timestamps: true, // Automatically manages createdAt and updatedAt tracking info
  }
);

// ⚡ STANDARDALIZED: Named it "User" so that `ref: "User"` inside Cart.model.js links cleanly
const User = mongoose.model("User", loginSchema);

export default User;