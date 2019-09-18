const mongoose = require("mongoose");
const Schema = mongoose.Schema

let bookSchema = new Schema({ 
    title: String,
    author: Array,
    summary: String,
    datePublished: Date,
    dateAdded: {type: Date, default: Date.now}
})
let Book = mongoose.model("Book", bookSchema)

module.exports = Book;
