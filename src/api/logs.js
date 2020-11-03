const { Router } = require("express");
const QuoteEntry = require("../models/quoteEntry");
const router = Router();

const { MONGO_URI } = process.env;

router.get("/", async (req, res, next) => {
  // return all log entries
  try {
    const entries = await QuoteEntry.find();
    res.json(entries);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const newEntry = new QuoteEntry(req.body);
    const createdEntry = await newEntry.save();
    res.json(createdEntry);
  } catch (error) {
    next(error);
  }
});

router.delete("/", (req, res) => {
  const id = req.headers.id;
  QuoteEntry.findOneAndDelete({
    _id: id,
  }).exec((err, post) => {
    if (err)
      return res.status(500).json({
        code: 500,
        message: "There was an error deleting",
        error: err,
      });
    res
      .status(200)
      .json({ code: 200, message: "Post deleted", deletedPost: post });
  });
});

module.exports = router;
