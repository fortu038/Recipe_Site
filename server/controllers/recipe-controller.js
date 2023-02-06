const Recipe = require("../models/Recipe");

require("dotenv").config;

const getAllRecipes = async (req, res) => {
  try {
    const getAllQuery = await Recipe.find({});
    res.status(200).json({ result: "success", payload: getAllQuery });
  }
  catch(err) {
    res.status(400).json({ message: "No recipes found!" });
  }
};