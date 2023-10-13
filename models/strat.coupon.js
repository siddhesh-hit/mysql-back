module.exports = (sequelize, DataTypes) => {
  const coupon = sequelize.define("coupon", {
    coupon_code: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    coupon_amount: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    coupon_available_count: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    coupon_use_count: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    coupon_start_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    coupon_expiry_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    coupon_status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  });

  return coupon;
};
