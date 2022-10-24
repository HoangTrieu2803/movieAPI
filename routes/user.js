const router = require("express").Router();
const userController = require("../controllers/userController");

//ADD USER
router.post("/", userController.addUser);


module.exports = router;