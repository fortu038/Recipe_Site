const { Schema, model } = require('mongoose');

const recipeSchema = new Schema(
  {
    image: {
      file: { type: Buffer, required: true },
      filename: { type: String, required: true },
      mimetype: { type: String, required: true },
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
    tools_needed: {
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
    id: false,
  }
);

const Recipe = model("Recipe", recipeSchema);

module.exports = Recipe;