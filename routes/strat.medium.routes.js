const router = require("express").Router();
const multer = require("multer");
const {
  postMedium,
  getMedia,
  getMediumById,
  updateMedium,
  deleteMedium,
} = require("../controllers/medium.controller");
const { authMiddleware, superAdmin } = require("../middlewares/authMiddleware");

// multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images/mediums");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

// route
router.post(
  "/medium",
  authMiddleware,
  superAdmin,
  upload.single("icon_url"),
  postMedium
);
router.get("/media", authMiddleware, superAdmin, getMedia);
router.get("/medium/:id", authMiddleware, superAdmin, getMediumById);
router.put(
  "/medium/:id",
  authMiddleware,
  superAdmin,
  upload.single("icon_url"),
  updateMedium
);
router.delete("/medium/:id", authMiddleware, superAdmin, deleteMedium);

module.exports = router;
