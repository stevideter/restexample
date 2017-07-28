var express = require('express');

var routes = function (Book) {
    var bookRouter = express.Router();
    var bookController = require('../controllers/bookController')(Book);
    bookRouter.route('/')
        .post(bookController.post)
        .get(bookController.get);
    bookRouter.use('/:bookId', function (req, res, next) {
        Book.findById(req.params.bookId, function (err, book) {
            if (err) {
                res.status(500).json({error: err});
            } else if (!book) {
                res.status(404).json({error: 'book not found'});
            } else {
                req.book = book;
                next();
            }
        });
    });
    bookRouter.route('/:bookId')
        .get(function (req, res) {
            var book = req.book.toJSON();
            book.links = {
                self: 'http://' + req.headers.host + '/api/books/' + book._id,
                filterByThisGenre: 'http://' + req.headers.host + '/api/books/?genre=' + encodeURIComponent(book.genre)
            };
            res.json(book);
        })
        .put(function (req, res) {
            var book = req.book;
            book.title = req.body.title;
            book.author = req.body.author;
            book.genre = req.body.genre;
            book.read = req.body.read;
            book.save(function(err, result) {
                if (err) {
                    res.status(404).json({error: 'error saving ' + err});
                } else {
                    res.json(result);
                }
            });
        })
        .patch(function(req, res) {
            for (var p in req.body) {
                if (p !== '_id') {
                    req.book[p] = req.body[p];
                }
            }
            req.book.save(function(err, result) {
                if (err) {
                    res.status(404).json({error: 'error saving ' + err});
                } else {
                    res.json(result);
                }
            });
        })
        .delete(function(req, res) {
            req.book.remove(function(err, result) {
                if (err) {
                    res.status(404).json({error: 'error deleting ' + err});
                } else {
                    res.status(204).send();
                }
            });
        });

    return bookRouter;
};

module.exports = routes;
