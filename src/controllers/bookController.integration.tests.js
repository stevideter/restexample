var should = require('should'),
    request = require('supertest'),
    mongoose = require('mongoose'),
    Book = require('../models/bookModel'),
    app = require('../../app'),
    agent = request.agent(app);

describe('Book CRUD test', function() {
    it('should allow a book to be posted and return a read and _id', function(done) {
        var bookPost = {
            title: 'Title',
            author: 'Author'
        };

        agent.post('/api/books')
            .send(bookPost)
            .expect(201)
            .end(function(err, results) {
                if (err) { throw err; }
                results.body.read.should.equal(false);
                results.body.should.have.property('_id');
                done();
            });
    });

    afterEach(function(done) {
        Book.remove().exec();
        done();
    });
});
