const mongoose = require("mongoose");
const notificationSchema = new mongoose.Schema(
  {
    title: { type: String },
    description: { type: String },
    branch: {
      type: String,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "user",
    },
    batch: {
      type: String,
    },
    expiresAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("notification", notificationSchema);
