const express = require("express");
const router = express.Router();
// const multer = require("multer");
const Book = require("../models/book");
const Author = require("../models/author");
// const upload = multer({ dest: "uploads" });

// All Books
router.get("/", async (req, res) => {
  res.send("All books");
});

//New Books
router.get("/new", async (req, res) => {
  try {
    const authors = await Author.find({});
    const book = new Book();
    res.render("books/new", {
      authors: authors,
      book: book,
    });
  } catch (error) {
    res.redirect("/books");
  }
});

// Creating Books
router.post("/", async (req, res) => {
  try {
    const book = await new Book({
      title: req.body.title,
      author: req.body.author,
      publishedDate: new Date(req.body.publishedDate),
      pageCount: req.body.pageCount,
      description: req.body.description,
    });

    book.save();
  } catch (error) {
    res.redirect("/books");
  }
});

module.exports = router;
