const { NoteModel } = require("../model");

const addNote = async (data) => {
  try {
    return await NoteModel.create(data);
  } catch (error) {
    throw error;
  }
};

const getNote = async (query) => {
  try {
    return await NoteModel.find(query).lean().exec();
  } catch (error) {
    throw error;
  }
};

const updateNote = async (query, updateData) => {
  try {
    return await NoteModel.findOneAndUpdate(query, updateData, { new: true })
      .lean()
      .exec();
  } catch (error) {
    throw error;
  }
};

const deleteNote = async (query) => {
  try {
    return await NoteModel.findOneAndDelete(query).lean().exec();
  } catch (error) {
    throw error;
  }
};

module.exports = {
  addNote,
  getNote,
  updateNote,
  deleteNote,
};
