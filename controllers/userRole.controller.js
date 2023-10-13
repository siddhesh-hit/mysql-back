const asyncHandler = require("express-async-handler");
const db = require("../models/index");
const UserRole = db.userRole;

// @desc    POST a new user role
const createUserRole = asyncHandler(async (req, res) => {
  try {
    const { name, description, role_id, user_role_id } = req.body;

    if (user_role_id !== 0) {
      res.status(400);
      throw new Error("Invalid user role data");
    }

    const checkUserRole = await UserRole.findOne({ where: { name } });

    if (checkUserRole) {
      res.status(400);
      throw new Error("User role already exists");
    }

    const userRole = await UserRole.create({
      name,
      description,
      role_id,
    });

    if (userRole) {
      res.status(201).json({
        id: userRole.id,
        name: userRole.name,
        description: userRole.description,
        role_id: userRole.role_id,
      });
    } else {
      res.status(400);
      throw new Error("Invalid user role data");
    }
  } catch (error) {
    res.status(400);
    throw new Error(error);
  }
});

// @desc    GET all user roles
const getUserRoles = asyncHandler(async (req, res) => {
  try {
    const userRoles = await UserRole.findAll();

    res.status(200).json(userRoles);
  } catch (error) {
    res.status(400);
    throw new Error(error);
  }
});

module.exports = { createUserRole, getUserRoles };
