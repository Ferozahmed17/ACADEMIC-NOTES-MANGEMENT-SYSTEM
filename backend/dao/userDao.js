const { UserModel } = require("../model");

const addUser = async (data) => {
  try {
    return await UserModel.create(data);
  } catch (error) {
    throw error;
  }
};

const getUser = async (query) => {
  try {
    return await UserModel.find(query).lean().exec();
  } catch (error) {
    throw error;
  }
};

const updateUser = async (query, updateData) => {
  try {
    return await UserModel.findOneAndUpdate(query, updateData, { new: true })
      .lean()
      .exec();
  } catch (error) {
    throw error;
  }
};

const deleteUser = async (query) => {
  try {
    return await UserModel.findOneAndDelete(query).lean().exec();
  } catch (error) {
    throw error;
  }
};

module.exports = {
  addUser,
  getUser,
  updateUser,
  deleteUser,
};
