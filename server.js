if (process.env.NODE_ENV !== "production") {
  require("dotenv");
}

const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

// App initializing
const app = express();

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.set("layout", "layouts/layout");
app.use(expressLayouts);
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ limits: "10mb", extended: false }));

// Connecting the database
mongoose.connect(process.env.DATABASE_URL || "mongodb://localhost/elib", {
  useNewUrlParser: true,
});
const db = mongoose.connection;

db.on("error", (error) => console.error("Failed to Connect to the database"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

const indexRouter = require("./routes/index");
const authorRouter = require("./routes/authors");
const bookRouter = require("./routes/books");

app.use("/", indexRouter);
app.use("/authors", authorRouter);
app.use("/books", bookRouter);

// Listening on port
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}  `);
});
