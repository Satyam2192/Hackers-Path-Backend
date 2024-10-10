const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const cron = require("node-cron");

// Routes Import
const statsRoute = require("./routes/stats.routes");
const deviationRoute = require("./routes/deviation.routes");
const fetchAndStoreCryptoData = require("./jobs/fetchCryptoData.job");

dotenv.config();

const PORT = process.env.PORT || 7000;
const app = express();

// Database connection
mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => { console.log("db connected successfully"); })
  .catch((err) => {
    console.log("err in connecting to database", err);
    process.exit(1);
  });

// Middleware
app.use(cors({ origin: '*' }));
app.use(express.json({ limit: '50mb' }));
app.use(cookieParser());

// Routes Mount
app.use("/stats", statsRoute);
app.use("/deviation", deviationRoute);

// job to run every 2 hours
cron.schedule("0 */2 * * *", fetchAndStoreCryptoData); 

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
