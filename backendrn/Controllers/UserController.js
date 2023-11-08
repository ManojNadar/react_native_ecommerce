import User from "../Models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Register

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body.user;
    console.log(name, email, password);

    if (!name || !email || !password)
      return res.status(404).json({
        success: false,
        message: "all fields are mandatory",
      });

    const isEmailExist = await User.find({ email });

    if (isEmailExist?.length) {
      return res.status(404).json({
        success: false,
        message: "Email already registered Please try another email",
      });
    }

    const hashPass = await bcrypt.hash(password, 10);
    const userDetail = new User({
      name,
      email,
      password: hashPass,
    });

    await userDetail.save();

    return res.status(200).json({
      success: true,
      message: "Registered Success",
      data: userDetail,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Login

export const login = async (req, res) => {
  try {
    const { email, password } = req.body.user;
    console.log(email, password, "backend");
    if (!email || !password) {
      return res.status(404).json({
        success: false,
        message: "All fields are mandatory",
      });
    }

    const user = await User.findOne({ email });

    if (user) {
      const isPasswordMatch = await bcrypt.compare(password, user.password);

      if (isPasswordMatch) {
        const userObj = {
          name: user.name,
          email: user.email,
          _id: user._id,
        };
        const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY);
        return res.json({
          success: true,
          message: "Logged In Success",
          userData: userObj,
          token: token,
        });
      }
    }
    return res.json({
      success: false,
      message: "invalid Credential",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Currentuser
export const currentuser = async (req, res) => {
  try {
    const { token } = req.body;

    // console.log(token);

    if (!token)
      return res
        .status(404)
        .json({ success: false, message: "token is required" });

    const decodeToken = jwt.verify(token, process.env.SECRET_KEY);

    if (!decodeToken) {
      return res
        .status(404)
        .json({ success: false, message: "not a valid token" });
    }

    const userId = decodeToken?.userId;

    const user = await User.findById(userId);

    // console.log(user);

    if (user) {
      const userObj = {
        name: user.name,
        email: user.email,
        userId: user._id,
      };

      // console.log(userObj);

      return res.status(200).json({
        success: true,
        currentuser: userObj,
      });
    }

    return res.status(404).json({ success: false, message: "user not found" });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// add to cart

export const addtocart = async (req, res) => {
  try {
    const { id, token, singleProduct } = req.body;

    // const { id } = singleProduct;
    // console.log(singleProduct);

    if (!token || !id) throw new Error("Token and productId is required");

    const decodeToken = jwt.verify(token, process.env.SECRET_KEY);
    const userId = decodeToken?.userId;

    const user = await User.findById({ _id: userId });
    // console.log(user?.cart);
    for (let i = 0; i < user?.cart?.length; i++) {
      if (user.cart[i].id == id) {
        return res
          .status(404)
          .json({ success: false, message: "Product already added" });
      }
    }

    user?.cart.push(singleProduct);
    await user.save();

    return res.status(200).json({
      success: true,
      message: "product added successfully",
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Catch block Error",
      error: error.message,
    });
  }
};

// get Cart Products

export const getCartProducts = async (req, res) => {
  try {
    const { token } = req.body;
    const decodeToken = jwt.verify(token, process.env.SECRET_KEY);
    const userId = decodeToken?.userId;

    const user = await User.findById(userId);

    if (user) {
      // console.log(user.cart);
      return res.status(200).json({ success: true, cartproduct: user.cart });
    }

    throw new Error("User not Found");
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Catch block Error",
    });
  }
};

export const removeItem = async (req, res) => {
  try {
    const { id, token } = req.body;
    if (!token || !id) throw new Error("Token and productId is required");

    const decodeToken = jwt.verify(token, process.env.SECRET_KEY);
    const userId = decodeToken?.userId;

    const user = await User.findById({ _id: userId });

    const ourCartProduct = user.cart;

    const filterCartProduct = ourCartProduct.filter((e) => e.id !== id);

    user.cart = filterCartProduct;

    await user.save();

    const refreshCart = await User.findById({ _id: userId });

    if (refreshCart) {
      return res.status(200).json({
        success: true,
        refreshCartProducts: refreshCart.cart,
        message: "product removed Success",
      });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "internal server error" });
  }
};
