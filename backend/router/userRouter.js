const express = require("express");
const { UserController } = require("../controller");
const userRouter = express.Router();

userRouter.get("/get-user", UserController.getUser);
userRouter.post("/add-user", UserController.addUser);
userRouter.put("/update-user", UserController.updateUser);
userRouter.delete("/delete-user", UserController.deleteUser);
userRouter.post("/login", UserController.login);
userRouter.post("/logout", UserController.logout);
userRouter.post("/validate-session", UserController.validateSession);

module.exports = userRouter;
