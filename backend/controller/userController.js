const { UserDao } = require("../dao");

const addUser = async (req, res, next) => {
  try {
    const savedData = await UserDao.addUser(req?.body);
    res.json({
      success: true,
      message: "User saved successfully!",
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

const getUser = async (req, res, next) => {
  try {
    const readData = await UserDao.getUser(req?.query);
    res.json({
      success: true,
      message: "User read successfully!",
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

const updateUser = async (req, res, next) => {
  try {
    const updateData = await UserDao.updateUser(req?.query, req?.body);
    res.json({
      success: true,
      message: "User updated successfully!",
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

const deleteUser = async (req, res, next) => {
  try {
    const deletedData = await UserDao.deleteUser(req?.query);
    res.json({
      success: true,
      message: "User deleted successfully!",
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

const login = async (req, res, next) => {
  try {
    const { phone, email, password } = req?.body;
    if (!phone && !email && !password) {
      return res.json({
        success: false,
        message: "Missing Data",
      });
    }
    const [readData] = await UserDao.getUser({ phone, password });
    req.session.user = readData;
    res.json({
      success: readData ? true : false,
      message: readData ? "Autenticated successfully!" : "Invalid credentials",
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

const logout = async (req, res, next) => {
  try {
    await req.session.destroy();
    res.json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

const validateSession = async (req, res, next) => {
  try {
    res.json({
      success: req?.session?.user ? true : false,
      message: req?.session?.user ? "Valid Session" : "Invalid Session",
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  addUser,
  getUser,
  updateUser,
  deleteUser,
  login,
  logout,
  validateSession,
};
