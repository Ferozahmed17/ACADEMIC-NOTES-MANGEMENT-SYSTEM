const { NotificationDao } = require("../dao");

const addNotification = async (req, res, next) => {
  try {
    req.body.user = req?.session?.user?._id;
    req.body.branch = req?.session?.user?.branch;
    const savedData = await NotificationDao.addNotification(req?.body);
    res.json({
      success: true,
      message: "Notification saved successfully!",
      data: savedData,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

const getNotification = async (req, res, next) => {
  try {
    const readData = await NotificationDao.getNotification(req?.query);
    res.json({
      success: true,
      message: "Notification read successfully!",
      data: readData,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

const updateNotification = async (req, res, next) => {
  try {
    const updateData = await NotificationDao.updateNotification(req?.query, req?.body);
    res.json({
      success: true,
      message: "Notification updated successfully!",
      data: updateData,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

const deleteNotification = async (req, res, next) => {
  try {
    const deletedData = await NotificationDao.deleteNotification(req?.query);
    res.json({
      success: true,
      message: "Notification deleted successfully!",
      data: deletedData,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { addNotification, getNotification, updateNotification, deleteNotification };
