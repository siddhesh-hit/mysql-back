const asyncHandler = require("express-async-handler");
const db = require("../models/index");
const Platform = db.platform;

// @desc    Post a platform
const publishPlatform = asyncHandler(async (req, res) => {
  try {
    const { channel_id, all_services, service, description_platform } =
      req.body;

    const checkPlatform = await Platform.findOne({
      where: {
        channel_id,
      },
    });

    if (checkPlatform) {
      res.status(401);
      throw new Error("Platform already exists for specific id.");
    }

    const platform = await Platform.create({
      channel_id: channel_id * 1,
      all_services,
      service,
      description_platform,
    });

    if (platform) {
      res.status(201).json({
        success: true,
        data: platform,
      });
    } else {
      res.status(401);
      throw new Error("Platform not created.");
    }
  } catch (error) {
    res.status(500);
    throw new Error(error);
  }
});

// @desc    Get all platform
const getPlatforms = asyncHandler(async (req, res) => {
  try {
    const platform = await Platform.findAll();

    if (platform) {
      res.status(200).json({
        success: true,
        data: platform,
      });
    } else {
      res.status(401);
      throw new Error("Platform not found.");
    }
  } catch (error) {
    res.status(500);
    throw new Error(error);
  }
});

// @desc    Get a single platform id
const getPlatform = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const platform = await Platform.findOne({
      where: {
        id,
      },
    });

    if (platform) {
      res.status(201).json({
        success: true,
        data: platform,
      });
    } else {
      res.status(401);
      throw new Error("Platform not found.");
    }
  } catch (error) {
    res.status(500);
    throw new Error(error);
  }
});

// @desc    Update a platform
const updatePlatform = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const { channel_id, all_services, service, description_platform } =
      req.body;

    const platform = await Platform.findOne({
      where: {
        id,
      },
    });

    if (!platform) {
      res.status(401);
      throw new Error("Platform not found.");
    }

    platform.channel_id = channel_id ? channel_id : platform.channel_id;
    platform.all_services = all_services ? all_services : platform.all_services;
    platform.service = service ? service : platform.service;
    platform.description_platform = description_platform
      ? description_platform
      : platform.description_platform;

    const updatedPlatform = await platform.save();

    if (updatedPlatform) {
      res.status(201).json({
        success: true,
        data: updatedPlatform,
      });
    } else {
      res.status(401);
      throw new Error("Platform not updated.");
    }
  } catch (error) {
    res.status(500);
    throw new Error(error);
  }
});

// @desc    Delete a platform
const deletePlatform = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const platform = await Platform.findOne({
      where: {
        id,
      },
    });

    if (!platform) {
      res.status(401);
      throw new Error("Platform not found.");
    }

    await platform.destroy();

    res.status(201).json({
      success: true,
      message: "Platform deleted.",
    });
  } catch (error) {
    res.status(500);
    throw new Error(error);
  }
});

module.exports = {
  publishPlatform,
  getPlatform,
  getPlatforms,
  updatePlatform,
  deletePlatform,
};
