const express = require("express");
const { RatingController } = require("../controller");
const ratingRouter = express.Router();
ratingRouter.get("/get-rating", RatingController.getRating);
ratingRouter.post("/add-rating", RatingController.addRating);
ratingRouter.put("/update-rating", RatingController.updateRating);
ratingRouter.delete("/delete-rating", RatingController.deleteRating);

module.exports = ratingRouter;
