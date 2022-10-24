const roomController = require("../controllers/rommController")
const router = require("express").Router()
//ADD ROOM
router.post("/", roomController.addRoom)

//GET A ROOM
router.get("/:id" , roomController.getARoom);
// GET ALL ROOM
router.get("/",roomController.getAllRoom);
module.exports = router;