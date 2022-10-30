const router = require("express").Router();
const scheduleController = require("../controllers/scheduleController")
// ADD SCHEDULE
router.post("/",scheduleController.addSchedule);
// GET A SCHEDULE
router.get("/:id", scheduleController.getASchedule);
// GET ALL SCHEDULE
router.get("/",scheduleController.getAllSchedule)
//UPDATE SCHEDULE
router.put("/:id", scheduleController.updateSchedule);
//DELETE SCHEDULE
router.delete("/:id",scheduleController.deleteSchedule);
module.exports = router;