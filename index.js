const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const dotenv = require("dotenv").config()

const { readdirSync } = require("fs")
const database = require("././config/database.js")
const { errorHandler } = require("./middlewares/errorHandler")


const app = express();
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cors())


//routes
readdirSync("./routes").map((r) => app.use("/", require("./routes/" + r)));

// error handler
app.use(errorHandler);

// database
mongoose.set("strictQuery", true);
database();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

