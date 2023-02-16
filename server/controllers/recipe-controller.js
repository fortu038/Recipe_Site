const Recipe = require("../models/Recipe");

require("dotenv").config();

const getAllRecipes = async (req, res) => {
  try {
    const getAllQuery = await Recipe.find({});
    res.status(200).json({ result: "success", payload: getAllQuery });
  }
  catch(err) {
    res.status(400).json({ message: "No recipes found!" });
  }
};

const getRecipeById = async (req, res) => {
  try {
    const getByIdQuery = await Recipe.findById(req.params.id)

    if(!getByIdQuery) {
      res.status(400).json({ message: "No recipe found with that ID!" });
    }
    else {
      res.status(200).json({ result: "success", payload: getByIdQuery });
    }
  }
  catch(err) {
    res.status(400).json({ message: "An error occured during search, please try again later." });
  }
};

const createRecipe = async (req, res) => {
  try {
    const createQuery = await Recipe.create(req.body);
    res.status(200).json({result: "success", payload: createQuery});
  }
  catch(err) {
    res.status(400).json({ message: "Unable to create a recipe!" });
  }
};

const updateRecipeById = async (req, res) => {
  try {
    const updateByIdQuery = await Recipe.findOneAndUpdate(
      {_id: req.params.id},
      { $set: req.body },
      { runValidators: true, new: true }
    );

    if(!updateByIdQuery) {
      res.status(400).json({ message: "Cannot update, no recipe found with that ID!" });
    }
    else {
      res.status(200).json({ result: "success", payload: updateByIdQuery });
    }
  }
  catch(err) {
    console.log(err);
    res.status(400).json({ message: "An error occured while updating recipe, please try again later." });
  }
};

const deleteRecipeById = async (req,res) => {
  try {
    const delByIdQuery = await Recipe.findOneAndDelete({ _id: req.params.id });

    if(!delByIdQuery) {
      res.status(400).json({ message: "Cannot delete, no recipe found with that ID!" });
    }
    else {
      res.status(200).json({ result: "success", payload: delByIdQuery });
    }
  }
  catch(err) {
    res.status(400).json({ message: "An error occured during deletion, please try again later." });
  }
};

module.exports = {
  getAllRecipes, 
  getRecipeById,
  createRecipe,
  updateRecipeById,
  deleteRecipeById,
};