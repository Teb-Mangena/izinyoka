import { uploadFromBuffer } from "../lib/cloudinary.js";
import { verifyImage } from "../lib/gemini.js";
import Report from "../models/report.model.js";

export const getMyReports = async (req,res) => {
  try {
    const userId = req.user.id;

    const reports = await Report.find({ userId });
    
    if (reports.length === 0) {
      return res.status(404).json({ message: "You don't have any reports" });
    }

    res.status(200).json(reports);
  } catch (error) {
    console.log("Error in getting reports", error);
    res.status(500).json({message:"Internal server error"});
  }
}

export const getAReport = async (req,res) => {
  try {
    const {id} = req.params;

    const report = await Report.findById(id);

    if(!report) return res.status(404).json({message:"Report does not exist"});

    res.status(200).json(report);

  } catch (error) {
    console.log("Error in getting a report", error);
    res.status(500).json({message:"Internal server error"});
  }
}

export const postReport = async (req,res) => {
  try {
    const userId = req.user.id;
    const { title, description, location } = req.body;

    if(!title || !location) return res.status(400).json({ message: "Title and location are required" });

    let imageData = null;
    if(req.file && req.file.buffer){
      imageData = await uploadFromBuffer(req.file.buffer);
    }

    // AI verifies izinyoka images
    let AIVerified = {};

    const imageVerified = await verifyImage(imageData.secure_url);

    if(imageVerified) {
      AIVerified = {
        feedback: imageVerified,
        verified: true
      }
    }

    const createdReport = await Report.create({
      title,
      location,
      description,
      image:imageData,
      AIVerified,
      userId,
    })

    res.status(201).json({message:"Report sent successfully", createdReport});

  } catch (error) {
    console.log("Error in getting a report", error);
    res.status(500).json({message:"Internal server error"});
  }
}

export const getReports = async (req,res) => {
  try {
    const reports = await Report.find();

    res.status(200).json(reports);
  } catch (error) {
    console.log("Error in getting all reports", error);
    res.status(500).json({message:"Internal server error"});
  }
}