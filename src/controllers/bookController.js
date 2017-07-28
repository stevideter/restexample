var bookController = function(Book) {
    var post = function(req, res) {
            if (!req.body.title) {
                res.status(400);
                res.json({error: 'Title is required'});
            } else {
                var book = new Book(req.body);
                book.save();
                res.status(201);
                res.json(book);
            }
        };
    var get = function(req, res) {
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
        };
    return {
        post: post,
        get: get
    };
};

module.exports = bookController;