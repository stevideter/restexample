var should = require('should'),
    sinon = require('sinon');

describe('bookController tests', function() {
    describe('post', function() {
        it('should not allow empty title on post', function() {
            var Book = function(book) {this.save = function() {};};
            var req = {
                body: {
                    author: 'An Author'
                }
            };
            var res = {
                status: sinon.spy(),
                json: sinon.spy()
            };

            var bookController = require('./bookController')(Book);
            bookController.post(req, res);
            res.status.calledWith(400).should.equal(true,'bad status ' + res.status.args[0][0]);
            res.json.calledWith({error: 'Title is required'}).should.equal(true);
        });
    });
});
