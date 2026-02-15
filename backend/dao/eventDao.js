const { EventModel } = require("../model");

const addEvent = async (data) => {
  try {
    return await EventModel.create(data);
  } catch (error) {
    throw error;
  }
};

const getEvent = async (query) => {
  try {
    return await EventModel.find(query).lean().exec();
  } catch (error) {
    throw error;
  }
};

const updateEvent = async (query, updateData) => {
  try {
    return await EventModel.findOneAndUpdate(query, updateData, { new: true })
      .lean()
      .exec();
  } catch (error) {
    throw error;
  }
};

const deleteEvent = async (query) => {
  try {
    return await EventModel.findOneAndDelete(query).lean().exec();
  } catch (error) {
    throw error;
  }
};

module.exports = {
  addEvent,
  getEvent,
  updateEvent,
  deleteEvent,
};
