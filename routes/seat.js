const router = require("express").Router();
const seatController = require("../controllers/seatController");
//ADD SEAT
router.post("/", seatController.addSeat)

module.exports = router;