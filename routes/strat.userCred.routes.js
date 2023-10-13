const router = require("express").Router();

const {
  registerUser,
  loginUser,
  getUserProfile,
  getAllUsers,
  updateUserProfile,
} = require("../controllers/userCred.controller");
const {
  authMiddleware,
  superAdmin,
  isAdmin,
  isUser,
} = require("../middlewares/authMiddleware");

// routes
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", authMiddleware, isUser, getUserProfile);
router.get("/getAllProfile", authMiddleware, superAdmin, getAllUsers);
router.put("/profile", authMiddleware, isUser, updateUserProfile);

module.exports = router;
