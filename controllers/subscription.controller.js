const asyncHandler = require("express-async-handler");
const db = require("../models/index");
const Subscription = db.subscription;
const User = db.userCredential;

// @desc    Post a subscription
const postSubscription = asyncHandler(async (req, res) => {
  try {
    const { user_id, plan_name, platforms, transaction_id, coupon, amount } =
      req.body;

    const checkUser = await User.findOne({ where: { id: user_id } });

    if (!checkUser) {
      res.status(404);
      throw new Error("User not found");
    }

    const subscription = await Subscription.create({
      user_id,
      plan_name,
      platforms,
      transaction_id,
      coupon,
      amount,
    });

    if (subscription) {
      res.status(201).json({
        message: "Subscription created successfully",
        subscription,
      });
    } else {
      res.status(400);
      throw new Error("Invalid subscription data");
    }
  } catch (error) {
    res.status(500);
    throw new Error(error);
  }
});

// @desc    Get all subscription
const getSubscriptions = asyncHandler(async (req, res) => {
  try {
    const subscriptions = await Subscription.findAll();

    if (subscriptions) {
      res.status(200).json({
        message: "Subscriptions fetched successfully",
        subscriptions,
      });
    } else {
      res.status(404);
      throw new Error("No subscription found");
    }
  } catch (error) {
    res.status(500);
    throw new Error(error);
  }
});

// @desc    Get subscription by id
const getSubscriptionById = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const subscription = await Subscription.findOne({ where: { id } });
    if (subscription) {
      res.status(200).json({
        message: "Subscription fetched successfully",
        subscription,
      });
    } else {
      res.status(404);
      throw new Error("Subscription not found");
    }
  } catch (error) {
    res.status(500);
    throw new Error(error);
  }
});

// @desc    Update subscription by id
const updateSubscription = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const { user_id, plan_name, platforms, transaction_id, coupon, amount } =
      req.body;

    const checkSubscription = await Subscription.findOne({ where: { id } });

    if (!checkSubscription) {
      res.status(404);
      throw new Error("Subscription not found");
    }

    checkSubscription.user_id = user_id ? user_id : checkSubscription.user_id;
    checkSubscription.plan_name = plan_name
      ? plan_name
      : checkSubscription.plan_name;
    checkSubscription.platforms = platforms
      ? platforms
      : checkSubscription.platforms;
    checkSubscription.transaction_id = transaction_id
      ? transaction_id
      : checkSubscription.transaction_id;
    checkSubscription.coupon = coupon ? coupon : checkSubscription.coupon;
    checkSubscription.amount = amount ? amount : checkSubscription.amount;

    const updatedSubscription = await checkSubscription.save();

    if (updatedSubscription) {
      res.status(200).json({
        message: "Subscription updated successfully",
        updatedSubscription,
      });
    } else {
      res.status(400);
      throw new Error("Invalid subscription data");
    }
  } catch (error) {
    res.status(500);
    throw new Error(error);
  }
});

// @desc    Delete subscription by id
const deleteSubscription = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const subscription = await Subscription.findOne({ where: { id } });

    if (!subscription) {
      res.status(404);
      throw new Error("Subscription not found");
    }

    await subscription.destroy();

    res.status(200).json({
      message: "Subscription deleted successfully",
    });
  } catch (error) {
    res.status(500);
    throw new Error(error);
  }
});

module.exports = {
  postSubscription,
  getSubscriptions,
  getSubscriptionById,
  updateSubscription,
  deleteSubscription,
};
