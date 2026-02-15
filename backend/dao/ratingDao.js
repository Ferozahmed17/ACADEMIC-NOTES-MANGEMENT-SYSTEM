const { RatingModel } = require("../model");

const addRating = async (data) => {
  try {
    return await RatingModel.create(data);
  } catch (error) {
    throw error;
  }
};

const getRating = async (query) => {
  try {
    return await RatingModel.find(query)
      .populate([
        {
          path: "user",
          model: "user",
          select: "name",
        },
        {
          path: "event",
          model: "event",
          select: "name isActiveRating",
        },
      ])
      .lean()
      .exec();
  } catch (error) {
    throw error;
  }
};

const updateRating = async (query, updateData) => {
  try {
    return await RatingModel.findOneAndUpdate(query, updateData, { new: true })
      .lean()
      .exec();
  } catch (error) {
    throw error;
  }
};

const deleteRating = async (query) => {
  try {
    return await RatingModel.findOneAndDelete(query).lean().exec();
  } catch (error) {
    throw error;
  }
};

module.exports = {
  addRating,
  getRating,
  updateRating,
  deleteRating,
};
