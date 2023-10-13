const asyncHandler = require("express-async-handler");
const db = require("../models/index");
const List = db.list;
const Image = db.image;
const Channel = db.channel;
const Medium = db.medium;

// @desc    Post a list
const postList = asyncHandler(async (req, res) => {
  try {
    const { hot, content, channel_list_id, medium_list_id, created_byId } =
      req.body;

    let content_media = req.files;
    content_media = content_media.content_media;

    console.log(content_media, content_media.length);

    const published_at = new Date();

    const checkChannel = await Channel.findByPk(channel_list_id);

    if (!checkChannel) {
      res.status(400);
      throw new Error("No channel found in database for the id.");
    }

    const checkMedium = await Medium.findByPk(medium_list_id);

    if (!checkMedium) {
      res.status(400);
      throw new Error("No medium found in database for the id.");
    }

    // create the list
    const listData = await List.create({
      hot,
      content,
      created_byId,
      published_at,
      channel_list_id,
      medium_list_id,
    });

    // create image records for list content media
    const contentMediaImages = [];
    for (let i = 0; i < content_media.length; i++) {
      const contentMediaImage = await Image.create({
        created_byId,
        image: content_media[i],
        type: "list",
        published_at,
        list_image_id: listData.id,
      });
      contentMediaImages.push(contentMediaImage);
    }

    // Associate the images with the list
    await listData.addImages(contentMediaImages);

    res.status(201).json({
      success: true,
      listData,
      contentMediaImages,
    });
  } catch (error) {
    res.status(500);
    throw new Error(error);
  }
});

// @desc    Get all lists
const getLists = asyncHandler(async (req, res) => {
  try {
    const lists = await List.findAll({
      include: [
        {
          model: Image,
          as: "images",
          attributes: ["image"],
        },
        {
          model: Channel,
          as: "channel",
          attributes: ["text"],
        },
        {
          model: Medium,
          as: "medium",
          attributes: ["medium"],
        },
      ],
    });

    res.status(200).json({
      success: true,
      lists,
    });
  } catch (error) {
    res.status(500);
    throw new Error(error);
  }
});

// @desc    Get a list by id
const getListById = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    const list = await List.findByPk(id, {
      include: [
        {
          model: Image,
          as: "images",
          attributes: ["image"],
        },
        {
          model: Channel,
          as: "channel",
          attributes: ["text"],
        },
        {
          model: Medium,
          as: "medium",
          attributes: ["medium"],
        },
      ],
    });

    res.status(200).json({
      success: true,
      list,
    });
  } catch (error) {
    res.status(500);
    throw new Error(error);
  }
});

// @desc    Update a list
const updateList = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const { hot, content, channel_list_id, medium_list_id, updated_byId } =
      req.body;
    let content_media = req.files.content_media;

    // check if list exists
    const listData = await List.findByPk(id);
    if (!listData) {
      res.status(400);
      throw new Error("No list found in database for the id.");
    }

    // check if channel exists
    const checkChannel = await Channel.findByPk(channel_list_id);
    if (!checkChannel) {
      res.status(400);
      throw new Error("No channel found in database for the id.");
    }

    // check if medium exists
    const checkMedium = await Medium.findByPk(medium_list_id);
    if (!checkMedium) {
      res.status(400);
      throw new Error("No medium found in database for the id.");
    }

    // update the list
    listData.hot = hot ? hot : listData.hot;
    listData.content = content ? content : listData.content;
    listData.channel_list_id = channel_list_id
      ? channel_list_id
      : listData.channel_list_id;
    listData.medium_list_id = medium_list_id
      ? medium_list_id
      : listData.medium_list_id;
    listData.updated_byId = updated_byId ? updated_byId : listData.updated_byId;
    listData.updated_at = new Date();

    await listData.save();

    if (req.files) {
      content_media = req.files.content_media;
      console.log(content_media, content_media.length);
      const contentMediaImages = [];

      // check if content media exists
      const checkContentMedia = await Image.findAll({
        where: {
          list_image_id: id,
          type: "list",
        },
      });

      // if content media exists, delete the records
      if (checkContentMedia) {
        await Image.destroy({
          where: {
            list_image_id: id,
            type: "list",
          },
        });
      }

      // create image records for list content media
      for (let i = 0; i < content_media.length; i++) {
        const contentMediaImage = await Image.create({
          created_byId: updated_byId,
          image: content_media[i],
          type: "list",
          published_at: new Date(),
          list_image_id: listData.id,
        });
        contentMediaImages.push(contentMediaImage);
      }
      res.json({ success: true, listData, contentMediaImages });
    } else {
      res.json({ success: true, listData });
    }
  } catch (error) {
    res.status(500);
    throw new Error(error);
  }
});

// @desc    Delete a list
const deleteList = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    const list = await List.findByPk(id);

    if (!list) {
      res.status(400);
      throw new Error("List does not exist");
    }

    await list.destroy();

    res.status(200).json({ success: true, message: "List is deleted." });
  } catch (error) {
    res.status(500);
    throw new Error(error);
  }
});

module.exports = {
  postList,
  getLists,
  getListById,
  updateList,
  deleteList,
};
