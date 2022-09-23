if (process.env.NODE_ENV !== "production") {
  require("dotenv");
}
// require("dotenv");
const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const mongoose = require("mongoose");

const flash = require("connect-flash");
const session = require("express-session");
const passport = require("passport");

// App initializing
const app = express();

//passport local strategy config
require("./config/passport")(passport);

// Routes
const indexRouter = require("./routes/index");
const authorRouter = require("./routes/authors");
const bookRouter = require("./routes/books");
const usersRouter = require("./routes/users");

app.use(expressLayouts);
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.set("layout", "layouts/layout");
app.use(express.static("public"));
app.use(express.urlencoded({ limits: "10mb", extended: false }));

// express session
app.use(
  session({
    secret: "mysecret",
    resave: true,
    saveUninitialized: true,
  })
);

// Passport initialize

app.use(passport.initialize());
app.use(passport.session());

// connect flash
app.use(flash());

// Global variables
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  next();
});

// Connecting the database
mongoose.connect(process.env.DATABASE_URL || "mongodb://localhost/elib", {
  useNewUrlParser: true,
});
const db = mongoose.connection;

db.on("error", (error) => console.error("Failed to Connect to the database"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

app.use("/", indexRouter);
app.use("/authors", authorRouter);
app.use("/books", bookRouter);
app.use("/users", usersRouter);

// Listening on port
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}  `);
});
