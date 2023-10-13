module.exports = (sequelize, DataTypes) => {
  const image = sequelize.define("image", {
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
    image: {
      type: DataTypes.JSON,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Please enter a image",
        },
        notEmpty: {
          msg: "Please enter a image",
        },
      },
      unique: "image",
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Please enter a type",
        },
        notEmpty: {
          msg: "Please enter a type",
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
  });

  return image;
};
