const express = require("express");
const { EventController } = require("../controller");
const eventRouter = express.Router();
eventRouter.get("/get-event", EventController.getEvent);
eventRouter.post("/add-event", EventController.addEvent);
eventRouter.put("/update-event", EventController.updateEvent);
eventRouter.delete("/delete-event", EventController.deleteEvent);

module.exports = eventRouter;
