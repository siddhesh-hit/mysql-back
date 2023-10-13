const router = require("express").Router();

const {
  createUserRole,
  getUserRoles,
} = require("../controllers/userRole.controller");

const { authMiddleware, superAdmin } = require("../middlewares/authMiddleware");

// routes
router.post("/createUserRole", createUserRole);
router.get("/getUserRoles", authMiddleware, superAdmin, getUserRoles);

module.exports = router;
