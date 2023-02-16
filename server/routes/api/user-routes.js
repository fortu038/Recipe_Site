const router = require("express").Router();

const { 
  getAllUsers,
  lookupUserByToken,
  getUserById,
  createUser,
  authenticateLogin,
  updateUserById,
  deleteUserById,
} = require("../../controllers/user-controller")

// route for getting all users
router.route("/").get(getAllUsers);
// route for getting if an user is logged based on their cookies/tokens
router.route("/lookup").get(lookupUserByToken);
// route for getting an user by its id
router.route("/:id").get(getUserById);

// route for creating a new user
router.route("/").post(createUser);
// route for authenticating an user login
router.route("/auth").post(authenticateLogin);

// route for updating an user by its id
router.route("/:id").put(updateUserById);

// route for deleting an user by its id
router.route("/:id").delete(deleteUserById);

module.exports = router;