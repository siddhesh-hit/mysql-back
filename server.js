// external modules
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");

// internal modules
const { errorHandler, notFound } = require("./middlewares/errorMiddleware");
const userCredRoutes = require("./routes/strat.userCred.routes");
const userRoleRoutes = require("./routes/strat.userRole.routes");
const channelRoutes = require("./routes/strat.channel.routes");
const mediumRoutes = require("./routes/strat.medium.routes");
const listRoutes = require("./routes/strat.list.routes");
const platformRoutes = require("./routes/strat.platform.routes");
const subscriptionRoutes = require("./routes/strat.subscription.routes");
const couponRoutes = require("./routes/strat.coupon.routes");

// defining the modules
const app = express();
dotenv.config();

// defining cors and json and cookie

const corsConfig = {
  origin: true,
  credentials: true,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
};

app.use(cors(corsConfig));
app.options("*", cors(corsConfig));

app.use(cookieParser());
app.use(express.json());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// test get
app.get("/api/back", (req, res) => {
  res.json({ message: "Welcome to the backend" });
});

// defining the routes
app.use("/api/user", userCredRoutes);
app.use("/api/userRole", userRoleRoutes);
app.use("/api/channel", channelRoutes);
app.use("/api/medium", mediumRoutes);
app.use("/api/list", listRoutes);
app.use("/api/platform", platformRoutes);
app.use("/api/subscription", subscriptionRoutes);
app.use("/api/coupon", couponRoutes);

// static files
app.use("/Images", express.static("./Images"));

// error handler
app.use(notFound);
app.use(errorHandler);

// defining the port
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(process.env.SECRET_JWT);
  console.log(`Server is running on port ${PORT}.`);
});
