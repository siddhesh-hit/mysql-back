const router = require("express").Router();
const {
  publishPlatform,
  getPlatforms,
  getPlatform,
  deletePlatform,
  updatePlatform,
} = require("../controllers/platform.controller");
const { authMiddleware, superAdmin } = require("../middlewares/authMiddleware");

// routes
router.post("/platform", authMiddleware, publishPlatform);
router.get("/platforms", authMiddleware, superAdmin, getPlatforms);
router.get("/platform/:id", getPlatform);
router.put("/platform/:id", updatePlatform);
router.delete("/platform/:id", authMiddleware, superAdmin, deletePlatform);

module.exports = router;
