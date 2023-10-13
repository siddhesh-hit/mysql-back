module.exports = (sequelize, DataTypes) => {
  const userCredential = sequelize.define("userCredential", {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Please enter a username",
        },
        notEmpty: {
          msg: "Please enter a username",
        },
      },
      unique: "username",
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notNull: {
          msg: "Please enter an email",
        },
        notEmpty: {
          msg: "Please enter an email",
        },
      },
      unique: "email",
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Please enter a password",
        },
        notEmpty: {
          msg: "Please enter a password",
        },
      },
    },
    blocked: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    user_role_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Please enter a user role id",
        },
        notEmpty: {
          msg: "Please enter a user role id",
        },
      },
    },
  });

  userCredential.associate = (models) => {
    userCredential.belongsTo(models.userRole, {
      foreignKey: "user_role_id",
      as: "userRole",
    });
  };

  return userCredential;
};
