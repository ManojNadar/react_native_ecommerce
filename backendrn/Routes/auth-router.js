import express from "express";
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
} from "../Controllers/UserController.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("hello world");
});

router.post("/register", register);
router.post("/login", login);
router.post("/currentuser", currentuser);
router.post("/addtocart", addtocart);
router.post("/getcartproducts", getCartProducts);
router.post("/removeitem", removeItem);
router.post("/checkout", checkOut);
router.post("/updateprofile", updateProfile);
router.post("/addfeedback", addFeedBack);
router.get("/getfeedback", getFeedBack);
router.post("/getorderproducts", getOrderProducts);
router.post("/removeorders", removeOrderProducts);
router.post("/finalbuy", finalBuy);

export default router;
