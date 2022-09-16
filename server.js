const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const mongoose = require("mongoose");

// App initializing
const app = express();

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.set("layout", "layouts/layout");
app.use(expressLayouts);
app.use(express.static("public"));

// Connecting the database
mongoose.connect(process.env.DATABASE_URL || "mongodb://localhost:/elib", {
  useNewUrlParser: true,
});
const db = mongoose.connection;

db.on("error", (error) => console.error("Failed to Connect to the database"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

const indexRouter = require("./routes/index");
app.use("/", indexRouter);

// Listening on port
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}  `);
});
