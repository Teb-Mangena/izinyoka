import jwt from "jsonwebtoken";
import { ENV } from "./env.js";

export const genToken = (res,id) => {
  const token = jwt.sign(
    {id},
    ENV.JWT_SECRET,
    { expiresIn: "7d"}
  );

  res.cookie('token', token, {
    httpOnly: true,
    secure: ENV.NODE_ENV === "development" ? false : true,
    sameSite: "none", 
    // TODO: in production set sameSite to none and secure to true. for local comment out sameSite OR set secure to true so that cookies can be accepted
    maxAge: 7 * 24 * 60 * 60 * 1000
  });

  return token;
}