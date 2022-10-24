const router = require("express").Router();
const scheduleController = require("../controllers/scheduleController")
// ADD SCHEDULE
router.post("/",scheduleController.addSchedule);
// GET A SCHEDULE
router.get("/:id", scheduleController.getASchedule);
module.exports = router;