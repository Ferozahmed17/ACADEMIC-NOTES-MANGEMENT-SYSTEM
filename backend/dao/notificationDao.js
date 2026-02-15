const { NotificationModel } = require("../model");

const addNotification = async (data) => {
  try {
    return await NotificationModel.create(data);
  } catch (error) {
    throw error;
  }
};

const getNotification = async (query) => {
  try {
    return await NotificationModel.find(query).lean().exec();
  } catch (error) {
    throw error;
  }
};

const updateNotification = async (query, updateData) => {
  try {
    return await NotificationModel.findOneAndUpdate(query, updateData, { new: true })
      .lean()
      .exec();
  } catch (error) {
    throw error;
  }
};

const deleteNotification = async (query) => {
  try {
    return await NotificationModel.findOneAndDelete(query).lean().exec();
  } catch (error) {
    throw error;
  }
};

module.exports = {
  addNotification,
  getNotification,
  updateNotification,
  deleteNotification,
};
