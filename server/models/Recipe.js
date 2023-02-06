const { Schema, model } = require('mongoose');

const recipeSchema = new Schema(
  {
    image: {
      type: String,
      required: true,
    },
    alt_text: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    ingredients: {
      type: [String],
      required: true,
    },
    steps: {
      type: [String],
      required: true,
    },
    posted_by: {
      type: String,
      required: true,
    },
    tags: {
      type: [String],
      required: true,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

const Recipe = model("Recipe", recipeSchema);

module.exports = Recipe;