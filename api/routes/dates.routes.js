const Router = require("express");
const datesController = require("../controller/dates.controller");

const { getAllEvents, createEvent, deleteEvent } = datesController;
const router = new Router();

router.get("/getAll", getAllEvents);
router.post("/", createEvent);
router.delete("/:event", deleteEvent);

module.exports = router;
