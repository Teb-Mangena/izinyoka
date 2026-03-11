import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  surname: {
    type: String,
    required: true
  },
  profilePic: {
    secure_url: { type: String },
    public_id: { type: String }
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true,
    enum: ["user","admin"],
    default: "user"
  }
},{timestamps:true});

const User = mongoose.model('User', userSchema);

export default User;