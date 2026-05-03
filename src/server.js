import express from "express";
import multer from "multer";

import config from "./config/config.js";
import productRoute from "./routes/product.route.js";
import userRoute from "./routes/user.route.js";
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
  response.send("Home page");
});

app.get("/about", (req, res) => {
  res.send("About page");
});

app.get("/contact", (req, res) => {
  res.send("Contact Page");
});

app.post("/contact", (req, res) => {
  res.send("Contact form submitted.");
});

app.use("/api/products", upload.array("images", 5), productRoute);
app.use("/api/users", auth, upload.single("image"), userRoute);
app.use("/api/auth", authRoute);

app.listen(config.port, () => {
  console.log(`Server running at port ${config.port}...`);
});
