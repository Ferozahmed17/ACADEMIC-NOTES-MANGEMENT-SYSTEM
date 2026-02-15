const { EventDao, UserDao, RatingDao } = require("../dao");

const addEvent = async (req, res, next) => {
  try {
    req.body.user = req?.session?.user?._id;
    req.body.branch = req?.session?.user?.branch;
    const savedData = await EventDao.addEvent(req?.body);

    let ratingList = [];
    let branchUsers = await UserDao.getUser({
      branch: req.body.branch,
      userType: "student",
    });
    for (let i = 0; i < branchUsers?.length; i++) {
      ratingList.push({
        event: savedData?._id,
        user: branchUsers?.[i]?._id,
      });
    }
    await RatingDao.addRating(ratingList);
    res.json({
      success: true,
      message: "Event saved successfully!",
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

const getEvent = async (req, res, next) => {
  try {
    const readData = await EventDao.getEvent(req?.query);
    res.json({
      success: true,
      message: "Event read successfully!",
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

const updateEvent = async (req, res, next) => {
  try {
    const updateData = await EventDao.updateEvent(req?.query, req?.body);
    res.json({
      success: true,
      message: "Event updated successfully!",
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

const deleteEvent = async (req, res, next) => {
  try {
    const deletedData = await EventDao.deleteEvent(req?.query);
    res.json({
      success: true,
      message: "Event deleted successfully!",
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

module.exports = { addEvent, getEvent, updateEvent, deleteEvent };
