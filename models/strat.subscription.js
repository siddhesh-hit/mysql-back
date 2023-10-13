module.exports = (sequelize, DataTypes) => {
  const subscription = sequelize.define("subscription", {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: "user_id",
    },
    plan_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    platforms: {
      type: DataTypes.STRING, // Change to STRING to store as comma-separated string
      allowNull: false,
      get() {
        const platformsValue = this.getDataValue("platforms");
        return platformsValue ? platformsValue.split(",").map(Number) : [];
      },
      set(val) {
        // Ensure val is an array of numbers before setting
        if (Array.isArray(val) && val.every(Number.isInteger)) {
          const platformString = val.join(",");
          if (platformString !== this.getDataValue("platforms")) {
            this.setDataValue("platforms", platformString);
          }
        } else {
          throw new Error(
            "Invalid platforms value. Expected an array of integers."
          );
        }
      },
    },

    transaction_id: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: "transaction_id",
    },
    coupon: {
      type: DataTypes.STRING,
    },
    amount: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return subscription;
};
