import { CorsOptions } from "cors";

const corsOptions: CorsOptions = {
  origin:
    process.env.NODE_ENV === "production"
      ? "https://pedroflix-five.vercel.app"
      : "http://localhost:3000",
  credentials: true,
};

export default corsOptions;
