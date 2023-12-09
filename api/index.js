require("dotenv").config();
const express = require("express");
const cors = require("cors");
const datesRouter = require("./routes/dates.routes");

const app = express();

const PORT = process.env.PORT || 2222;

app.use(express.static("public"));
app.use(cors());
app.use(express.json());
app.use("/events", datesRouter);
app.use("/", (req, res) => res.json({ result: "Hello from root page" }));

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

app.listen(PORT, () => {
  console.log(`Server was started on ${PORT} port`);
});
