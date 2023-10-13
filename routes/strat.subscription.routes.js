const router = require("express").Router();
const {
  postSubscription,
  getSubscriptions,
  getSubscriptionById,
  updateSubscription,
  deleteSubscription,
} = require("../controllers/subscription.controller");
const { authMiddleware, superAdmin } = require("../middlewares/authMiddleware");

// routes
router.post("/subscription", authMiddleware, postSubscription);
router.get("/subscriptions", authMiddleware, superAdmin, getSubscriptions);
router.get("/subscription/:id", getSubscriptionById);
router.put("/subscription/:id", authMiddleware, superAdmin, updateSubscription);
router.delete(
  "/subscription/:id",
  authMiddleware,
  superAdmin,
  deleteSubscription
);

module.exports = router;
