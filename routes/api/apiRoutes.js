const db = require("../../models/Book");
const axios = require("axios");



module.exports = (app) => {
    app.get("/books", (req, res) => {
        let query = "harry potter"
        axios.get(`https://www.googleapis.com/books/v1/volumes?q=${query}&printType=books&key=AIzaSyBlTvz-kApJ0ZhYyKIPLl9as7hWtP8Su88`)
            .then((response) => {
                let booksArr = response.data.items
                let newArr = booksArr.map(book => {
                    let newBook = {}
                    newBook.title = book.volumeInfo.title;
                    newBook.author = book.volumeInfo.authors;
                    newBook.datePublished = book.volumeInfo.publishedDate;
                    newBook.link = book.selfLink
                    return newBook
                });
                
                res.json(newArr);  
            });

    });

};