const express = require("express");
const multer = require("multer");
const { NoteController } = require("../controller");
const noteRouter = express.Router();

const fs = require("fs");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // ensure media directory exists (avoid ENOENT from multer)
    const mediaDir = path.join(__dirname, "..", "media");
    try {
      fs.mkdirSync(mediaDir, { recursive: true });
      cb(null, mediaDir);
    } catch (err) {
      cb(err);
    }
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + file.originalname);
  },
});

const upload = multer({ storage: storage });

noteRouter.get("/get-note", NoteController.getNote);
noteRouter.post("/add-note", upload.single("noteFile"), NoteController.addNote);
noteRouter.put("/update-note", NoteController.updateNote);
noteRouter.delete("/delete-note", NoteController.deleteNote);

module.exports = noteRouter;
