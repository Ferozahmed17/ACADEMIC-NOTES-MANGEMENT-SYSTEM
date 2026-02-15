const { RatingDao } = require("../dao");

const addRating = async (req, res, next) => {
  try {
    req.body.user = req?.session?.user?._id;
    req.body.branch = req?.session?.user?.branch;
    const savedData = await RatingDao.addRating(req?.body);
    res.json({
      success: true,
      message: "Rating saved successfully!",
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

const getRating = async (req, res, next) => {
  try {
    const readData = await RatingDao.getRating(req?.query);
    res.json({
      success: true,
      message: "Rating read successfully!",
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

const updateRating = async (req, res, next) => {
  try {
    const updateData = await RatingDao.updateRating(req?.query, req?.body);
    res.json({
      success: true,
      message: "Rating updated successfully!",
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

const deleteRating = async (req, res, next) => {
  try {
    const deletedData = await RatingDao.deleteRating(req?.query);
    res.json({
      success: true,
      message: "Rating deleted successfully!",
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

module.exports = { addRating, getRating, updateRating, deleteRating };
