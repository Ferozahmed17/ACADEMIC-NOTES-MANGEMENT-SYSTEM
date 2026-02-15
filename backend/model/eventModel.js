const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    isActiveRating: {
      type: Boolean,
      default: false,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "user",
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
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("event", userSchema);
