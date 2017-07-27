var express = require('express');
var bookRouter = express.Router();
var Book = require('../models/bookModel');

var routes = function () {
    bookRouter.route('/')
        .post(function (req, res) {
            var book = new Book(req.body);
            console.log(book);
            book.save();
            res.status(201).json(book);
        })
        .get(function (req, res) {
            var query = {};
            if (req.query.genre) {
                query.genre = req.query.genre;
            }
            Book.find(query, function (err, books) {
                if (err) {
                    res.status(500).json({error: err});
                } else {
                    res.json(books);
                }

            });
        });
    bookRouter.route('/books/:bookId')
        .get(function (req, res) {
            Book.findById(req.params.bookId, function (err, book) {
                if (err) {
                    res.status(500).json({error: err});
                } else {
                    res.json(book);
                }
            });
        });
    return bookRouter;
};

module.exports = routes;