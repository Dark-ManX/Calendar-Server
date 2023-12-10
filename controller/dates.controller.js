const db = require("../db");
// import { sql } from "@vercel/postgres";

class DatesController {
  async createEvent(req, res) {
    try {
      const { date, title } = req.body;
      const event = await db.query(
        `INSERT INTO dates (event_date, event_title) VALUES (${date}, ${title})`,
        [date, title]
      );

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
        `DELETE FROM dates WHERE (event_date = ${changeString(
          paramsDate,
          "-"
        )} AND event_title = ${(paramsTitle, " ")})`,
        [changeString(paramsDate, "-"), changeString(paramsTitle, " ")]
      );

      function changeString(str, sign) {
        return str.split("_").join(sign);
      }

      res
        .status(200)
        .json({ code: 200, status: "Success", payload: "deletedEvent" });
    } catch (err) {
      res
        .status(400)
        .json({ code: 400, status: "Error", payload: "Something went wrong" });
    }
  }
}

module.exports = new DatesController();
