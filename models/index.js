const { Sequelize, DataTypes } = require("sequelize");
const dbConfig = require("../config/db.config.js");

// sequelize instance
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: "0",
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error(
      "Unable to connect to the database: " + err,
      err.original.sqlMessage
    );
  });

// db object
const db = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;

// models
db.userCredential = require("./strat.userCredential.js")(sequelize, DataTypes);
db.userRole = require("./strat.userRole.js")(sequelize, DataTypes);
db.channel = require("./strat.channel.js")(sequelize, DataTypes);
db.list = require("./strat.list.js")(sequelize, DataTypes);
db.medium = require("./strat.medium.js")(sequelize, DataTypes);
db.platform = require("./strat.platform.js")(sequelize, DataTypes);
db.coupon = require("./strat.coupon.js")(sequelize, DataTypes);
db.subscription = require("./strat.subscription.js")(sequelize, DataTypes);
db.image = require("./strat.image.js")(sequelize, DataTypes);

// associations //

// for one to many relationship between channel and medium
db.channel.hasMany(db.medium, {
  foreignKey: "channel_medium_id",
  as: "mediums",
});
db.medium.belongsTo(db.channel, {
  foreignKey: "channel_medium_id",
  as: "channel",
});

// for one to many relationship between channel and list
db.channel.hasMany(db.list, {
  foreignKey: "channel_list_id",
  as: "lists",
});
db.list.belongsTo(db.channel, {
  foreignKey: "channel_list_id",
  as: "channel",
});

// for one to many relationship between medium and list
db.medium.hasMany(db.list, {
  foreignKey: "medium_list_id",
  as: "lists",
});
db.list.belongsTo(db.medium, {
  foreignKey: "medium_list_id",
  as: "medium",
});

// for one to many relationship between list and image
db.list.hasMany(db.image, { foreignKey: "list_image_id", as: "images" });
db.image.belongsTo(db.list, {
  foreignKey: "list_image_id",
  as: "list",
});

// for one to many relationship between channel and image
db.channel.hasMany(db.image, { foreignKey: "channel_image_id", as: "images" });
db.image.belongsTo(db.channel, {
  foreignKey: "channel_image_id",
  as: "channel",
});

// for one to many relationship between medium and image
db.medium.hasMany(db.image, { foreignKey: "medium_image_id", as: "images" });
db.image.belongsTo(db.medium, {
  foreignKey: "medium_image_id",
  as: "medium",
});

// sync
db.sequelize
  .sync({ alter: true })
  // .sync()
  .then(() => console.log("Database is synced"))
  .catch((err) => console.log(err));

module.exports = db;
