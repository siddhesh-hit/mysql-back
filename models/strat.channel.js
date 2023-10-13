module.exports = (sequelize, DataTypes) => {
  const channel = sequelize.define("channel", {
    text: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Please enter a channel",
        },
        notEmpty: {
          msg: "Please enter a channel",
        },
      },
      unique: "text",
    },
    published_at: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Please enter a published_at",
        },
        notEmpty: {
          msg: "Please enter a published_at",
        },
      },
    },
    created_byId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Please enter a created_byId",
        },
        notEmpty: {
          msg: "Please enter a created_byId",
        },
      },
    },
    updated_byId: {
      type: DataTypes.INTEGER,
    },
    // icon_url: {
    //   type: DataTypes.STRING,
    //   allowNull: false,
    //   validate: {
    //     notNull: {
    //       msg: "Please enter a icon_url",
    //     },
    //     notEmpty: {
    //       msg: "Please enter a icon_url",
    //     },
    //   },
    // },
    // banner_url: {
    //   type: DataTypes.STRING,
    //   allowNull: false,
    //   validate: {
    //     notNull: {
    //       msg: "Please enter a banner_url",
    //     },
    //     notEmpty: {
    //       msg: "Please enter a banner_url",
    //     },
    //   },
    // },
  });

  return channel;
};
