const router = require("express").Router();
const multer = require("multer");
const {
  postList,
  getLists,
  getListById,
  updateList,
  deleteList,
} = require("../controllers/list.controller");
const { authMiddleware, superAdmin } = require("../middlewares/authMiddleware");

// multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images/lists");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

// route
router.post(
  "/list",
  authMiddleware,
  superAdmin,
  upload.fields([{ name: "content_media", maxCount: 4 }]),
  postList
);
router.get("/lists", authMiddleware, superAdmin, getLists);
router.get("/list/:id", authMiddleware, superAdmin, getListById);
router.put(
  "/list/:id",
  authMiddleware,
  superAdmin,
  upload.fields([{ name: "content_media", maxCount: 4 }]),
  updateList
);
router.delete("/list/:id", authMiddleware, superAdmin, deleteList);

module.exports = router;
