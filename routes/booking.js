const router = require("express").Router();
const bookingController = require("../controllers/bookingController");

//ADD BOOKING
router.post("/" , bookingController.addBooking);
//GET A BOOKING
router.get("/:id", bookingController.getABooking);
// GET ALL BOOKING
router.get("/",bookingController.getAllBooking);
module.exports = router;