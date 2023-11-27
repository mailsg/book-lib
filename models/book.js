const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const bookSchema = Schema({
    title: {type: String, required: true},
    author: {type: String, required: true},
    publication_year: {type: String, required: true},
});

module.exports = mongoose.model("Book", bookSchema);
