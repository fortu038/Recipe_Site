const router = require("express").Router();

const recipeRoutes = require("./recipe-routes");

router.use("/recipe", recipeRoutes);

module.exports = router;