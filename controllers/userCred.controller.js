const asyncHandler = require("express-async-handler");

const db = require("../models/index");
const UserCred = db.userCredential;
const generateToken = require("../utils/generateToken");
const bcrypt = require("bcryptjs");

// @desc    Register a new user
const registerUser = asyncHandler(async (req, res) => {
  try {
    const { username, email, password, user_role_id } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const checkUser = await UserCred.findOne({ where: { email } });

    if (checkUser) {
      res.status(400);
      throw new Error("User already exists");
    }

    const user = await UserCred.create({
      username,
      email,
      password: hashedPassword,
      user_role_id: user_role_id !== 2 ? 2 : 2 || 2,
    });

    if (user) {
      res.status(201).json({
        id: user.id,
        username: user.username,
        email: user.email,
        user_role_id: user.user_role_id,
      });
    } else {
      res.status(400);
      throw new Error("Invalid user data");
    }
  } catch (error) {
    res.status(400);
    throw new Error(error);
  }
});

// @desc    Login user
const loginUser = asyncHandler(async (req, res) => {
  try {
    const checkUser = await UserCred.findOne({
      where: { email: req.body.email },
    });

    if (!checkUser) {
      res.status(400);
      throw new Error("No user found");
    }

    const validPassword = await bcrypt.compare(
      req.body.password,
      checkUser.password
    );

    if (!validPassword) {
      res.status(400);
      throw new Error("Invalid password");
    }

    const token = generateToken(res, checkUser);

    // console.log(token, "==================>");

    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: true,
    });

    res.status(200).json({
      id: checkUser.id,
      username: checkUser.username,
      email: checkUser.email,
      user_role_id: checkUser.user_role_id,
      token,
    });
  } catch (error) {
    res.status(400);
    throw new Error(error);
  }
});

// @desc    Logout user
const logoutUser = asyncHandler(async (req, res) => {
  try {
    res.cookie("token", "", { httpOnly: true, expires: new Date(0) });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(400);
    throw new Error(error);
  }
});

// @desc    Get a user profile
const getUserProfile = asyncHandler(async (req, res) => {
  try {
    const user = await UserCred.findOne({
      where: { id: req.body.id },
      attributes: { exclude: ["password"] },
    });

    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  } catch (error) {
    res.status(400);
    throw new Error(error);
  }
});

// @desc   Get all users
const getAllUsers = asyncHandler(async (req, res) => {
  try {
    const users = await UserCred.findAll({
      attributes: { exclude: ["password"] },
    });

    if (users) {
      res.status(200).json(users);
    } else {
      res.status(404);
      throw new Error("Users not found");
    }
  } catch (error) {
    res.status(400);
    throw new Error(error);
  }
});

// @desc    Update user profile
const updateUserProfile = asyncHandler(async (req, res) => {
  try {
    const user = await UserCred.findOne({
      where: { id: req.body.id },
    });

    if (user) {
      user.username = req.body.username || user.username;
      user.email = req.body.email || user.email;
      user.password = req.body.password || user.password;
      user.user_role_id = user.user_role_id;

      const updatedUser = await user.save();

      res.status(200).json({
        id: updatedUser.id,
        username: updatedUser.username,
        email: updatedUser.email,
        user_role_id: updatedUser.user_role_id,
        token: generateToken(updatedUser.id),
      });
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  } catch (error) {
    res.status(400);
    throw new Error(error);
  }
});

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  getUserProfile,
  getAllUsers,
  updateUserProfile,
};
