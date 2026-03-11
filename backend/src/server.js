import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";

import { ENV } from "./config/env.js";
import { connectDB } from "./config/db.js";

import userRoutes from "./routes/user.route.js";

const app = express();
const { PORT } = ENV;

// Middlewares
app.use(cors({ origin: true, credentials: true }));
app.use(express.json({limit:"10mb"}));
app.use(cookieParser());
app.use(morgan('dev'));

// routes
app.get('/', (req,res) => {
  res.send('Backend Running');
});

app.use('/api/users', userRoutes);

// connect DB & listen to server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`App running on port ${PORT}`);
  });
})