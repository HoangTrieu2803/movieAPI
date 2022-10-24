const roomController = require("../controllers/rommController")
const router = require("express").Router()
//ADD ROOM
router.post("/", roomController.addRoom)

//GET A ROOM
router.get("/:id" , roomController.getARoom);
module.exports = router;