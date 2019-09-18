const db = require("../models/Book");
const axios = require("axios");


module.exports = (app) => {
    app.get("/api/books", (req, res) => {
        let query = "Harry Potter and the Sorcerer's Stone"
        axios.get(`https://www.googleapis.com/books/v1/volumes?q=${query}&printType=books&key=AIzaSyBlTvz-kApJ0ZhYyKIPLl9as7hWtP8Su88`)
            .then((response) => {
                let targetBook = response.data.items[0]

                let newBook = {}
                newBook.title = targetBook.volumeInfo.title;
                newBook.author = targetBook.volumeInfo.authors;
                newBook.datePublished = targetBook.volumeInfo.publishedDate;

                db.create(newBook)
                    .then((dbBook) => {
                        res.json(dbBook)
                    })
                    .catch((err) => {
                        res.send(err)
                    })

            }).catch((err) => {
                // This is catch for axios.get
                res.send(err);
            });


    });

};