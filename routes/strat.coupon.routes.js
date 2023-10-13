const router = require("express").Router();
const {
  postCoupon,
  getCoupons,
  getCouponById,
  updateCoupon,
  deleteCoupon,
} = require("../controllers/coupon.controller");
const { authMiddleware, superAdmin } = require("../middlewares/authMiddleware");

// routes
router.post("/coupon", authMiddleware, superAdmin, postCoupon);
router.get("/coupons", authMiddleware, superAdmin, getCoupons);
router.get("/coupon/:id", authMiddleware, superAdmin, getCouponById);
router.put("/coupon/:id", authMiddleware, superAdmin, updateCoupon);
router.delete("/coupon/:id", authMiddleware, superAdmin, deleteCoupon);

module.exports = router;
