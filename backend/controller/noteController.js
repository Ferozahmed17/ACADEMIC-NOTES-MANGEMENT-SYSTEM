const { NoteDao } = require("../dao");

const addNote = async (req, res, next) => {
  try {
    // prefer session user but fall back to form data (useful in dev or when cookies are missing)
    req.body.user = req?.session?.user?._id || req.body.user;
    req.body.branch = req?.session?.user?.branch || req.body.branch;
    req.body.url = `${process.env.BASE_URL}/${req?.file?.filename}`;

    const savedData = await NoteDao.addNote(req?.body);
    res.json({
      success: true,
      message: "Note saved successfully!",
      data: savedData,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getNote = async (req, res, next) => {
  try {
    const readData = await NoteDao.getNote(req?.query);
    res.json({
      success: true,
      message: "Note read successfully!",
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

const updateNote = async (req, res, next) => {
  try {
    const updateData = await NoteDao.updateNote(req?.query, req?.body);
    res.json({
      success: true,
      message: "Note updated successfully!",
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

const deleteNote = async (req, res, next) => {
  try {
    const deletedData = await NoteDao.deleteNote(req?.query);
    res.json({
      success: true,
      message: "Note deleted successfully!",
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

module.exports = { addNote, getNote, updateNote, deleteNote };
