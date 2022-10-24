const router = require("express").Router();
const userController = require("../controllers/userController");

//ADD USER
router.post("/", userController.addUser);
//GET ALL USER
router.get("/",userController.getAllUser);
module.exports = router;