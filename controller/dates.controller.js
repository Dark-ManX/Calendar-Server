const db = require("../db");

class DatesController {
  async createEvent(req, res) {
    try {
      const { date, title } = req.body;

      console.log("params", date, title);
      const event = await db.query(`INSERT INTO dates VALUES ($1, $2)`, [
        date,
        title,
      ]);

      res.status(201).json({
        code: 201,
        status: "Created",
        payload: event,
      });
    } catch (err) {
      res
        .status(400)
        .json({ code: 400, status: "Error", payload: "Something went wrong" });
    }
  }

  async getAllEvents(req, res) {
    try {
      const events = await db.query(`SELECT * FROM dates`);

      res.status(200).json({
        code: 200,
        status: "Success",
        payload: events.rows,
      });
    } catch (err) {
      res.status(400).json({
        code: 400,
        status: "Error",
        payload: "Something went wrong",
      });
    }
  }

  async deleteEvent(req, res) {
    try {
      const { event } = req.params;
      const [paramsDate, paramsTitle] = event.split("-");

      const deletedEvent = db.query(
        `DELETE FROM dates WHERE (event_date = $1 AND event_title = $2)`,
        [changeString(paramsDate, " "), changeString(paramsTitle, " ")]
      );

      function changeString(str, sign) {
        return str.split("_").join(sign);
      }

      res
        .status(200)
        .json({ code: 200, status: "Success", payload: deletedEvent });
    } catch (err) {
      res
        .status(400)
        .json({ code: 400, status: "Error", payload: "Something went wrong" });
    }
  }
}

module.exports = new DatesController();
