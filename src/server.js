import express from "express";
import multer from "multer";

import config from "./config/config.js";
import productRoute from "./routes/product.route.js";
import userRoute from "./routes/user.route.js";
import orderRoute from "./routes/order.route.js";
import authRoute from "./routes/auth.route.js";
import connectDB from "./config/database.js";
import bodyParser from "body-parser";
import logger from "./middlewares/logger.js";
import auth from "./middlewares/auth.js";
import connectCloudinary from "./config/cloudinary.js";

const upload = multer({ storage: multer.memoryStorage() });

const app = express();

connectDB();
connectCloudinary();

app.use(bodyParser.json());
app.use(logger);

app.get("/", (request, response) => {
  response.json({
    status: "ok",
    version: "0.1.0",
    port: config.port,
  });
});

app.use("/api/products", upload.array("images", 5), productRoute);
app.use("/api/users", auth, upload.single("image"), userRoute);
app.use("/api/auth", authRoute);
app.use("/api/orders", auth, orderRoute);

app.listen(config.port, () => {
  console.log(`Server running at port ${config.port}...`);
});
