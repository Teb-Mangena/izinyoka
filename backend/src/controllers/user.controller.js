import validator from "validator";
import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import { genToken } from "../config/genToken.js";

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // validate inputs
    if(!email || !password){
      return res.status(400).json({message:"All fields must be filled"});
    }

    // check if email exists
    const user = await User.findOne({email});
    if(!user){
      return res.status(400).json({message:"Incorrect credentials"});
    }

    // match password
    const match = await bcrypt.compare(password,user.password);
    if(!match){
      return res.status(400).json({message:"Incorrect credentials"});
    }

    // generate token
    const token = genToken(res,user._id);

    // return the user
    res.status(200).json({
      message: "User logged in successfully",
      user,
      token
    });

  } catch (error) {
    console.log("Error in loginUser", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const signupUser = async (req, res) => {
  const {
    name,
    surname,
    email,
    password,
    profilePic,
    role
  } = req.body;

  try {
    // Validations
    if (!name || !surname || !email || !password) {
      return res.status(400).json({ message: "All fields must be filled" });
    }
    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }
    if (!validator.isStrongPassword(password)) {
      return res.status(400).json({ message: "Password is not strong enough" });
    }

    let avatarUrl = `https://ui-avatars.com/api/?name=${name}+${surname}&background=random`;

    // if no profile picture put avator
    const finalProfilePic = profilePic || avatarUrl;

    // check if email exists
    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // generate salt and hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // create a new user
    const user = new User({
      name,
      surname,
      profilePic: finalProfilePic,
      email,
      role,
      password: hashedPassword,
    });

    // generate token
    const token = genToken(res,user._id);

    // save user to the DB
    await user.save();

    res.status(201).json({
      message: "Account registered successfully",
      user,
      token
    });

  } catch (error) {
    console.log("Error in loginUser", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const logoutUser = async (req, res) => {
  try {
    res.cookie("token","",{maxAge:0});

    res.status(200).json({message:"Logged out successfully"});
  } catch (error) {
    console.log("Error in loginUser", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const checkAuth = async (req, res) => {
  try {
    res.status(200).json({
      message:"user is logged in",
      user: req.user
    });
  } catch (error) {
    console.log("Error in loginUser", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// TODO: user must delete own account
// export const deleteMyAccount = async (req,res) => {}

// FOR ADMINS
export const getAllUsers = async (req,res) => {
  try {
    const users = await User.find().sort({ created: -1 });

    res.status(200).json(users);
  } catch (error) {
    console.log("Error in getting all users", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export const updateUser = async (req,res) => {
  const update = req.body;
  const {id} = req.params;

  try {
    const updateUser = await User.findByIdAndUpdate(id,{ $set: update },{ new: true, runValidators: true });

    if(!updateUser){
      return res.status(400).json({ message: "User does not exist"});
    }

    res.status(201).json({ message: "User updated successfully", updateUser});
  } catch (error) {
    console.log("Error in getting all users", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export const deleleUser = async (req,res) => {
  const {id} = req.params;

  try {
    const deleteUser = await User.findByIdAndDelete(id);

    if(!deleteUser){
      return res.status(400).json({ message: "User does not exist"});
    }

    res.status(200).json({ message: "User deleted successfully", deleteUser });
  } catch (error) {
    console.log("Error in getting all users", error);
    res.status(400).json({ message: "Internal server error" });
  }
}