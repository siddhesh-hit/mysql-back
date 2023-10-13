const asyncHandler = require("express-async-handler");
const db = require("../models/index");
const Medium = db.medium;
const Image = db.image;
const Channel = db.channel;

// @desc    Post a medium
const postMedium = asyncHandler(async (req, res) => {
  try {
    const { medium, channel_medium_id, created_byId } = req.body;

    const icon_url = req.file;
    const published_at = new Date();

    const checkChannel = await Channel.findByPk(channel_medium_id);
    if (!checkChannel) {
      res.status(400);
      throw new Error("No channel found in database for the id.");
    }

    const mediumCheck = await Medium.findOne({
      where: {
        medium,
      },
    });

    if (mediumCheck) {
      res.status(400);
      throw new Error("Medium already exists.");
    }

    // create the medium
    const mediumData = await Medium.create({
      medium,
      created_byId,
      published_at,
      channel_medium_id,
    });

    // create image records for medium icon
    const iconImage = await Image.create({
      created_byId,
      image: icon_url,
      type: "medium",
      published_at,
    });

    // Associate the images with the channel
    await mediumData.addImage(iconImage);

    res.status(201).json({
      success: true,
      mediumData,
      iconImage,
    });
  } catch (error) {
    res.status(500);
    throw new Error(error);
  }
});

// @desc    Get all media
const getMedia = asyncHandler(async (req, res) => {
  try {
    const media = await Medium.findAll({
      include: [
        {
          model: Image,
          as: "images",
        },
      ],
    });

    res.status(200).json({ success: true, media });
  } catch (error) {
    res.status(500);
    throw new Error(error);
  }
});

// @desc    Get a medium by id
const getMediumById = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    const medium = await Medium.findByPk(id, {
      include: [
        {
          model: Image,
          as: "images",
        },
      ],
    });

    res.status(200).json({ success: true, medium });
  } catch (error) {
    res.status(400);
    throw new Error(error);
  }
});

// @desc    Update a medium
const updateMedium = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const { medium, updated_byId } = req.body;

    const mediumData = await Medium.findByPk(id);
    if (!mediumData) {
      res.status(400);
      throw new Error("No medium found in database for the id.");
    }

    // update the medium
    mediumData.medium = medium ? medium : mediumData.medium;
    mediumData.updated_byId = updated_byId
      ? updated_byId
      : mediumData.updated_byId;
    mediumData.updated_at = new Date();

    await mediumData.save();

    // update image records for medium icon
    let icon_url;
    if (req.file) {
      icon_url = req.file;
      const iconImage = await Image.findOne({
        where: {
          medium_image_id: id,
          type: "medium",
        },
      });

      if (!iconImage) {
        const published_at = new Date();
        const iconImage = await Image.create({
          created_byId: updated_byId,
          image: icon_url,
          type: "medium",
          published_at,
        });

        // Associate the images with the medium
        await mediumData.addImage(iconImage);

        res.status(201).json({
          success: true,
          mediumData,
          iconImage,
        });
      } else {
        iconImage.image = icon_url ? icon_url : iconImage.image;
        iconImage.updated_byId = updated_byId
          ? updated_byId
          : iconImage.updated_byId;
        iconImage.updated_at = new Date();

        await iconImage.save();

        res.status(200).json({
          success: true,
          mediumData,
          iconImage,
        });
      }
    }

    res.status(200).json({
      success: true,
      mediumData,
    });
  } catch (error) {
    res.status(500);
    throw new Error(error);
  }
});

// @desc    Delete a medium
const deleteMedium = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const medium = await Medium.findByPk(id);
    if (!medium) {
      res.status(400);
      throw new Error("No medium found in database for the id.");
    }
    await medium.destroy();
    res
      .status(200)
      .json({ success: true, message: "Medium deleted successfully." });
  } catch (error) {
    res.status(500);
    throw new Error(error);
  }
});

module.exports = {
  postMedium,
  getMedia,
  getMediumById,
  updateMedium,
  deleteMedium,
};
