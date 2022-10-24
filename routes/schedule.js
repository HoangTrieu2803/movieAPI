const router = require("express").Router();
const scheduleController = require("../controllers/scheduleController")
// ADD SCHEDULE
router.post("/",scheduleController.addSchedule);
// GET A SCHEDULE
router.get("/:id", scheduleController.getASchedule);
// GET ALL SCHEDULE
router.get("/",scheduleController.getAllSchedule)
module.exports = router;