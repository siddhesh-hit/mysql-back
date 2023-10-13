const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const secret = require("../config/jwt.config");

const authMiddleware = asyncHandler(async (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }

  try {
    const decoded = jwt.verify(token, secret.secret);
    if (!decoded) {
      res.status(401);
      throw new Error("Not authorized, token failed");
    }

    req.user = decoded;
    next();
  } catch (error) {
    res.status(401);
    throw new Error("Not authorized, token failed");
  }
});

const superAdmin = asyncHandler(async (req, res, next) => {
  if (req.user.user_role_id !== 0) {
    res.status(401);
    throw new Error("Not authorized as a super admin");
  }
  next();
});

const isAdmin = asyncHandler(async (req, res, next) => {
  if (req.user.user_role_id !== 1) {
    res.status(401);
    throw new Error("Not authorized as an admin");
  }
  next();
});

const isUser = asyncHandler(async (req, res, next) => {
  if (req.user.user_role_id !== 2) {
    res.status(401);
    throw new Error("Not authorized as a user");
  }
  next();
});

module.exports = { authMiddleware, superAdmin, isAdmin, isUser };
