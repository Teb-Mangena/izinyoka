import mongoose from "mongoose";

const Schema = mongoose.Schema;

const reportSchema = new Schema({
  image: {
    public_id: {
      type: String
    },
    secure_url: {
      type: String
    },
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  location: {
    type: String,
    required: true
  },
  AIVerified: {
    feedback: {
      type: String
    },
    verified: {
      type: Boolean
    }
  },
  status: {
    type: String,
    enum: ["pending","rejected","resolved"],
    default: "pending",
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
},{timestamps:true});

const Report = mongoose.model('Report', reportSchema);

export default Report;