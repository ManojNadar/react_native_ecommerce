import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
// import cors from "cors";
import dotenv from "dotenv";
import {
  addFeedBack,
  addtocart,
  checkOut,
  currentuser,
  finalBuy,
  getCartProducts,
  getFeedBack,
  getOrderProducts,
  login,
  register,
  removeItem,
  removeOrderProducts,
  updateProfile,
} from "./Controllers/UserController.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
// app.use(cors());

// User Routes
app.get("/", (req, res) => {
  res.send("hello world");
});
app.post("/register", register);
app.post("/login", login);
app.post("/currentuser", currentuser);
app.post("/addtocart", addtocart);
app.post("/getcartproducts", getCartProducts);
app.post("/removeitem", removeItem);
app.post("/checkout", checkOut);
app.post("/updateprofile", updateProfile);
app.post("/addfeedback", addFeedBack);
app.get("/getfeedback", getFeedBack);
app.post("/getorderproducts", getOrderProducts);
app.post("/removeorders", removeOrderProducts);
app.post("/finalbuy", finalBuy);

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB CONNECTED"))
  .catch(() => console.log("DB ERROR"));

app.listen(8000, () => {
  console.log("server running in port 8000");
});
