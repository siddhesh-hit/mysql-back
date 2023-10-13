const router = require("express").Router();
const multer = require("multer");
const asyncHandler = require("express-async-handler");
const {
  postChannel,
  getChannels,
  getChannelById,
  updateChannel,
  deleteChannel,
} = require("../controllers/channel.controller");
const { authMiddleware, superAdmin } = require("../middlewares/authMiddleware");

// multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images/channels");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

// route
router.post(
  "/channel",
  authMiddleware,
  superAdmin,
  upload.fields([
    { name: "icon_url", maxCount: 1 },
    { name: "banner_url", maxCount: 1 },
  ]),
  postChannel
);
router.get("/channels", authMiddleware, superAdmin, getChannels);
router.get("/channel/:id", authMiddleware, superAdmin, getChannelById);
router.put(
  "/channel/:id",
  authMiddleware,
  superAdmin,
  upload.fields([
    { name: "icon_url", maxCount: 1 },
    { name: "banner_url", maxCount: 1 },
  ]),
  updateChannel
);
router.delete("/channel/:id", authMiddleware, superAdmin, deleteChannel);

module.exports = router;
