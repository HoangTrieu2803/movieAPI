const router = require("express").Router();
const cinemaController = require("../controllers/cinemaController");

//ADD CINEMA
router.post("/" , cinemaController.addCinema);
//GET A CINEMA
router.get("/:id", cinemaController.getACinema);
// GET ALL CINEMA
router.get("/",cinemaController.getAllCinema);
module.exports = router;