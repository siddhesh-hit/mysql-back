module.exports = (sequelize, DataTypes) => {
  const list = sequelize.define("list", {
    hot: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Please enter a hot",
        },
        notEmpty: {
          msg: "Please enter a hot",
        },
      },
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Please enter a content",
        },
        notEmpty: {
          msg: "Please enter a content",
        },
      },
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
  });

  return list;
};
