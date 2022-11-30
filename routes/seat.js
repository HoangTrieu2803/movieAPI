const router = require("express").Router();
const seatController = require("../controllers/seatController");
//ADD SEAT
router.post("/", seatController.addSeat);
//GET ALL SEAT
router.get("/:id", seatController.getAllSeat);
module.exports = router;