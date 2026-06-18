const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const connectDB = require("./config/db");

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/teachers", require("./routes/teacherRoutes"));

app.use("/api/students", require("./routes/studentRoutes"));

app.use("/api/notes", require("./routes/noteRoutes"));

app.use("/api/tests", require("./routes/testRoutes"));

app.use("/api/results", require("./routes/resultRoutes"));

app.get("/", (req, res) => {
  res.send("Online Examination System API Running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server Running on Port ${PORT}`);
});
