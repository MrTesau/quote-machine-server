const mongoose = require("mongoose");

//pull out schema
const { Schema } = mongoose;

// create new schema for travel Logs
const quoteSchema = new Schema(
  {
    quote: String,
    author: String,
  },
  { timestamps: true }
);

const QuoteEntry = mongoose.model("QuoteEntry", quoteSchema);
module.exports = QuoteEntry;
