const router = require("express").Router()

const { 
  getAllRecipes, 
  getRecipeById,
  createRecipe,
  updateRecipeById,
  deleteRecipeById,
} = require("../../controllers/recipe-controller")

// route for getting all departments
router.route("/").get(getAllRecipes);
// route for getting a department by its id
router.route("/:id").get(getRecipeById);

// route for creating a new department
router.route("/").post(createRecipe);

// route for updating a department by its id
router.route("/:id").put(updateRecipeById);

// route for deleting a department by its id
router.route("/:id").delete(deleteRecipeById);

module.exports = router;