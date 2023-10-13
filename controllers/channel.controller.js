const asyncHandler = require("express-async-handler");
const db = require("../models/index");
const Channel = db.channel;
const Image = db.image;
const User = db.userCredential;

// @desc    Post a channel
const postChannel = asyncHandler(async (req, res) => {
  try {
    const { text, created_byId } = req.body;
    const { icon_url, banner_url } = req.files;

    // check if created_byId exists
    const user = await User.findByPk(created_byId);

    if (!user) {
      res.status(400);
      throw new Error("User does not exist");
    }

    const published_at = new Date();

    // Create the channel
    const channel = await Channel.create({
      text,
      created_byId,
      published_at,
    });

    // Create image records for icon_url and banner_url
    const iconImage = await Image.create({
      created_byId,
      image: icon_url[0],
      type: "icon",
      published_at,
    });

    const bannerImage = await Image.create({
      created_byId,
      image: banner_url[0],
      type: "banner",
      published_at,
    });

    // Associate the images with the channel
    await channel.addImage(iconImage);
    await channel.addImage(bannerImage);

    res.status(201).json({ success: true, channel, iconImage, bannerImage });
  } catch (error) {
    res.status(500);
    throw new Error(error);
  }
});

// @desc    Get all channels
const getChannels = asyncHandler(async (req, res) => {
  try {
    const channels = await Channel.findAll({
      include: [
        {
          model: Image,
          as: "images",
        },
      ],
    });

    res.status(200).json({ success: true, channels });
  } catch (error) {
    res.status(500);
    throw new Error(error);
  }
});

// @desc    Get a channel by id
const getChannelById = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    const channel = await Channel.findByPk(id, {
      include: [
        {
          model: Image,
          as: "images",
        },
      ],
    });

    res.status(200).json({ success: true, channel });
  } catch (error) {
    res.status(500);
    throw new Error(error);
  }
});

// @desc    Update a channel
const updateChannel = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const { text, updated_byId } = req.body;

    let iconImage, bannerImage;
    if (req.files && req.files.icon_url) {
      iconImage = await Image.findOne({
        where: {
          channel_image_id: id,
          type: "icon",
        },
      });
      iconImage.image = req.files.icon_url[0];
      iconImage.updated_byId = updated_byId
        ? updated_byId
        : iconImage.updated_byId;
      iconImage.updated_at = new Date();
      await iconImage.save();
    }

    if (req.files && req.files.banner_url) {
      bannerImage = await Image.findOne({
        where: {
          channel_image_id: id,
          type: "banner",
        },
      });
      bannerImage.image = req.files.banner_url[0];
      bannerImage.updated_byId = updated_byId
        ? updated_byId
        : bannerImage.updated_byId;
      bannerImage.updated_at = new Date();
      await bannerImage.save();
    }

    const channel = await Channel.findByPk(id);

    if (!channel) {
      res.status(400);
      throw new Error("Channel does not exist");
    }

    channel.text = text ? text : channel.text;
    channel.updated_byId = updated_byId ? updated_byId : channel.updated_byId;
    channel.updated_at = new Date();

    await channel.save();

    res.status(200).json({ success: true, channel, iconImage, bannerImage });
  } catch (error) {
    res.status(500);
    throw new Error(error);
  }
});

// @desc    Delete a channel
const deleteChannel = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    const channel = await Channel.findByPk(id);

    if (!channel) {
      res.status(400);
      throw new Error("Channel does not exist");
    }

    await channel.destroy();

    res
      .status(200)
      .json({ success: true, message: "Channel deleted successfully" });
  } catch (error) {
    res.status(500);
    throw new Error(error);
  }
});

module.exports = {
  postChannel,
  getChannels,
  getChannelById,
  updateChannel,
  deleteChannel,
};
