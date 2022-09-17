const express = require("express");
const Book = require("../models/book");

const router = express.Router();

// All Books
router.get("/", async (req, res) => {});

//New Books
router.get("/new", (req, res) => {});

// Creating Books
router.post("/", async (req, res) => {});

module.exports = router;
