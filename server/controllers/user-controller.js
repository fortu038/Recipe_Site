const User = require("../models/User");

const jwt = require("jsonwebtoken");
const cookie = require("cookie");
const bcrypt = require("bcrypt");

const connection = require("../config/connection");

require("dotenv").config();

const getAllUsers = async (req, res) => {
  try {
    const getAllQuery = await User.find({});
    res.status(200).json({ result: "success", payload: getAllQuery });
  }
  catch(err) {
    res.status(400).json({ message: "Unable to find any users, please try again later." });
  }
};

const lookupUserByToken = async (req, res) => {
  if( !req.headers || !req.headers.cookie ) {
    return res.status(401).json({message: "unauthorized to access"});
  }
  
  const cookies = cookie.parse(req.headers.cookie);
  const token = cookies["auth-token"];  //cookies.authToken
  if( !token ) {
    return res.status(401).json({message: "unauthorized to access"});
  }
  
  const isVerified = jwt.verify(token, process.env.JWT_SECRET);
  if( !isVerified ) {
    return res.status(401).json({message: "unauthorized to access"});
  }

  const user = await User.findById(isVerified._id);
  if( !user ) {
    return res.status(401).json({message: "unauthorized to access"});
  }

  return res.status(200).json({ result: "success", payload: user });
};

const getUserById = async (req, res) => {
  try {
    const getByIdQuery = await User.findById(req.params.id)
    res.status(200).json({ result: "success", payload: getByIdQuery });
  }
  catch(err) {
    res.status(400).json({ message: "No user found with that ID!" });
  }
};

const createUser = async (req, res) => {
  try {
    const createQuery = await User.create(req.body);
    res.status(200).json({result: "success", payload: createQuery});
  }
  catch(err) {
    const usernameCheck = await User.findOne({username: req.body.username});
    if(usernameCheck != null) {
      res.status(400).json({message: "This username is already in use."});
      return;
    }

    const emailCheck = await User.findOne({email: req.body.email});
    if(emailCheck != null) {
      res.status(400).json({message: "This email is already in use."});
      return;
    }
    res.status(400).json({ message: "Unable to create a user, please try again later." });
  }
};

const authenticateLogin = async (req, res) => {
  const foundUser = await User.findOne({ username: req.body.username });
  if( !foundUser ) {
    return res.status(401).json({ message: "Invalid username" });
  }

  const isValid = await bcrypt.compare(req.body.password, foundUser.password);
  if( !isValid ) {
    return res.status(401).json({ message: "Invalid password" });
  }

  const { password, ...modifiedUser } = foundUser;
  const token = jwt.sign({ _id: foundUser._id, username: foundUser.username}, process.env.JWT_SECRET);

  res
    .status(200)
    .set({ "auth-token": token })
    .json({ result: "success", user: modifiedUser, token: token })
};

const updateUserById = async (req, res) => {
  try {
    const updateByIdQuery = await User.findOneAndUpdate(
      {_id: req.params.id},
      { $set: req.body },
      { runValidators: true, new: true }
    );
    res.status(200).json({ result: "success", payload: updateByIdQuery });
  }
  catch(err) {
    res.status(400).json({ message: "No user found with that ID!" });
  }
};

const deleteUserById = async (req,res) => {
  try {
    const delByIdQuery = await User.findOneAndDelete({ _id: req.params.id });

    res.status(200).json({ result: "success", payload: delByIdQuery });
  }
  catch(err) {
    res.status(400).json({ message: "No user found with that ID!" });
  }
};

module.exports = { 
  getAllUsers,
  lookupUserByToken,
  getUserById,
  createUser,
  authenticateLogin,
  updateUserById,
  deleteUserById,
}