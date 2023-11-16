import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import router from "./Routes/auth-router.js";
import connectDb from "./Db/Database.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// User Routes
app.use("/", router);

const PORT = 8000;

connectDb().then(() => {
  app.listen(PORT, () => {
    console.log(`server running in port ${PORT}`);
  });
});
