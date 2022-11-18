const router = require("express").Router();
const movieController = require("../controllers/movieController")
const middlewareController = require("../controllers/middlewareController");
//ADD MOVIE
router.post("/", movieController.addMovie);
//GET ALL MOVIE
router.get("/",movieController.getAllMovie);
//GET A MOVIE
router.get("/:id",movieController.getAMovie);
//DELETE MOVIE
router.delete("/:id",movieController.deleteMovie);
//UPDATE MOVIE
router.put("/:id",movieController.updateMovie);
module.exports = router;
