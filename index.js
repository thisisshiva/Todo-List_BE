const express = require("express");
const cors = require("cors");
const dbConnect = require("./config/dbConnect");
const taskRouter = require("./routes/taskRouter");
require("dotenv").config();

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(taskRouter)


dbConnect()
  .then(() => {
    console.log("Database connected successfully");

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`server is running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.log("some error occured while connecting to db:" + error);
  });
