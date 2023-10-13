const asyncHandler = require("express-async-handler");
const db = require("../models/index");
const Coupon = db.coupon;

// @desc    Post a coupon
const postCoupon = asyncHandler(async (req, res) => {
  try {
    const {
      coupon_code,
      coupon_amount,
      coupon_available_count,
      coupon_use_count,
      coupon_start_date,
      coupon_expiry_date,
      coupon_status,
    } = req.body;

    const checkCoupon = await Coupon.findOne({
      where: { coupon_code: coupon_code },
    });

    if (checkCoupon) {
      res.status(400);
      throw new Error("Coupon already exists");
    }

    const coupon = await Coupon.create({
      coupon_code,
      coupon_amount,
      coupon_available_count,
      coupon_use_count,
      coupon_start_date,
      coupon_expiry_date,
      coupon_status,
    });

    if (coupon) {
      res.status(201).json({
        success: true,
        coupon,
      });
    } else {
      res.status(400);
      throw new Error("Invalid coupon data");
    }
  } catch (error) {
    res.status(500);
    throw new Error(error);
  }
});

// @desc    Get all coupon
const getCoupons = asyncHandler(async (req, res) => {
  try {
    const coupons = await Coupon.findAll();

    if (coupons) {
      res.status(200).json({
        success: true,
        coupons,
      });
    } else {
      res.status(404);
      throw new Error("Coupons not found");
    }
  } catch (error) {
    res.status(500);
    throw new Error(error);
  }
});

// @desc    Get a coupon by id
const getCouponById = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const coupon = await Coupon.findOne({ where: { id: id } });

    if (coupon) {
      res.status(200).json({
        success: true,
        coupon,
      });
    } else {
      res.status(404);
      throw new Error("Coupon not found");
    }
  } catch (error) {
    res.status(500);
    throw new Error(error);
  }
});

// @desc    Update a coupon
const updateCoupon = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const {
      coupon_code,
      coupon_amount,
      coupon_available_count,
      coupon_use_count,
      coupon_start_date,
      coupon_expiry_date,
      coupon_status,
    } = req.body;

    const coupon = await Coupon.findOne({ where: { id: id } });

    if (coupon) {
      coupon.coupon_code = coupon_code;
      coupon.coupon_amount = coupon_amount;
      coupon.coupon_available_count = coupon_available_count;
      coupon.coupon_use_count = coupon_use_count;
      coupon.coupon_start_date = coupon_start_date;
      coupon.coupon_expiry_date = coupon_expiry_date;
      coupon.coupon_status = coupon_status;

      const updatedCoupon = await coupon.save();

      if (updatedCoupon) {
        res.status(200).json({
          success: true,
          updatedCoupon,
        });
      } else {
        res.status(400);
        throw new Error("Invalid coupon data");
      }
    } else {
      res.status(404);
      throw new Error("Coupon not found");
    }
  } catch (error) {
    res.status(500);
    throw new Error(error);
  }
});

// @desc    Delete a coupon
const deleteCoupon = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const coupon = await Coupon.findOne({ where: { id: id } });

    if (coupon) {
      await coupon.destroy();
      res.status(200).json({
        success: true,
        message: "Coupon deleted successfully",
      });
    } else {
      res.status(404);
      throw new Error("Coupon not found");
    }
  } catch (error) {
    res.status(500);
    throw new Error(error);
  }
});

module.exports = {
  postCoupon,
  getCoupons,
  getCouponById,
  updateCoupon,
  deleteCoupon,
};
