const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String },
    userType: {
      type: String,
      enum: ["teacher", "student"],
      default: "student",
    },
    password: { type: String },
    batch: {
      type: String,
      enum: ["2021", "2022", "2023", "2024", "2025"],
      default: "2025",
    },
    branch: {
      type: String,
      enum: [
        "MCA",
        "BCA",
        "BSC",
        "BA",
        "B.COM",
        "CSE",
        "EEE",
        "ECE",
        "ISE",
        "AI/ML",
        "ME",
        "CIV",
      ],
    },
    sudentUsn: {
      type: String,
    },
    teacherId: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("user", userSchema);
