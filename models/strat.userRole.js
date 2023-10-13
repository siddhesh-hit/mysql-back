module.exports = (sequelize, DataTypes) => {
  const userRole = sequelize.define("userRole", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: "name",
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: "role_id",
    },
  });

  userRole.associate = (models) => {
    userRole.hasMany(models.userCredential, {
      foreignKey: "user_role_id",
      as: "userCredential",
    });
  };

  return userRole;
};
