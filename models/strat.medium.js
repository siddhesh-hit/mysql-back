module.exports = (sequelize, DataTypes) => {
  const medium = sequelize.define("medium", {
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
    medium: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Please enter a medium",
        },
        notEmpty: {
          msg: "Please enter a medium",
        },
      },
      unique: "medium",
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
  });

  return medium;
};
