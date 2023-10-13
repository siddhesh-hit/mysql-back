module.exports = (sequelize, DataTypes) => {
  const platform = sequelize.define("platform", {
    channel_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: "channel_id",
    },
    all_services: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    service: {
      type: DataTypes.STRING,
      allowNull: false,
      get() {
        return this.getDataValue("service").split(",");
      },
      set(val) {
        this.setDataValue("service", val.join(","));
      },
    },
    description_platform: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return platform;
};
