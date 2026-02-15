const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    event: {
      type: mongoose.Types.ObjectId,
      ref: "event",
    },
    rating: { type: Number, default: 0 },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "user",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("rating", userSchema);
