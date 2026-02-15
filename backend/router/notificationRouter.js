const express = require("express");
const { NotificationController } = require("../controller");
const notificationRouter = express.Router();

notificationRouter.get(
  "/get-notification",
  NotificationController.getNotification
);
notificationRouter.post(
  "/add-notification",
  NotificationController.addNotification
);
notificationRouter.put(
  "/update-notification",
  NotificationController.updateNotification
);
notificationRouter.delete(
  "/delete-notification",
  NotificationController.deleteNotification
);

module.exports = notificationRouter;
