require("dotenv").config();
const express = require("express");
const cors = require("cors");
const datesRouter = require("../routes/dates.routes");

const app = express();

const PORT = process.env.PORT || 2222;

app.use(cors());
app.use(express.json());
app.use("/events", datesRouter);

app.listen(PORT, () => {
  console.log(`Server was started on ${PORT}`);
});
