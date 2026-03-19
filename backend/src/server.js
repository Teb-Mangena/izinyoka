import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";

import { ENV } from "./config/env.js";
import { connectDB } from "./config/db.js";

import userRoutes from "./routes/user.route.js";
import reportRoutes from "./routes/report.route.js";

const app = express();
const { PORT } = ENV;
const allowedOrigins = [
  "http://localhost:5173",
  ENV.CLIENT_URL
];

// Middlewares
app.use(cors({ origin: allowedOrigins, credentials: true }));
app.use(express.json({limit:"10mb"}));
app.use(cookieParser());
app.use(morgan('dev'));

// routes
app.get('/', (req,res) => {
  res.send('Backend Running');
});

app.use('/api/users', userRoutes);
app.use('/api/reports', reportRoutes);

// connect DB & listen to server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`App running on port ${PORT}`);
  });
})