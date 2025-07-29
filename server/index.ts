import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import corsOptions from "./config/corsOptions";
import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes";

dotenv.config();

const app = express();
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.use("/", userRoutes);
app.use("/", authRoutes);

const port = 8080;
app.listen(port, "0.0.0.0", () => {
  console.log(`🚀 Server running on port ${port}`);
});
