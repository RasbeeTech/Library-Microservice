const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {
  let bookId;
  suite('Routing tests', function() {


    suite('POST /api/books with title => create book object/expect book object', function() {
      
      test('Test POST /api/books with title', function(done) {
        chai.request(server)
            .post('/api/books')
            .type('form')
            .send({
              title: 'example book'
            })
            .end((err, res) => {
              assert.equal(res.status, 200);
              assert.isObject(res.body, 'Book object should be returned');
              assert.property(res.body, '_id', 'Book object should contain _id');
              assert.property(res.body, 'title', 'Book object should contain title')
              bookId = res.body._id;
              done()
            })
      });
      
      test('Test POST /api/books with no title given', function(done) {
        chai.request(server)
            .post('/api/books')
            .type('form')
            .send({
              title: null
            })
            .end((err, res) => {
              assert.equal(res.status, 200);
              assert.isString(res.text);
              assert.equal(res.text, 'missing required field title', 'Should retrieve an error message if title is missing');
              done()
            })
      });
      
    });


    suite('GET /api/books => array of books', function(){
      
      test('Test GET /api/books',  function(done){
        chai.request(server)
            .get('/api/books')
            .end(function(err, res){
              assert.equal(res.status, 200);
              assert.isArray(res.body, 'response should be an array');
              assert.property(res.body[0], 'commentcount', 'Books in array should contain commentcount');
              assert.property(res.body[0], 'title', 'Books in array should contain title');
              assert.property(res.body[0], '_id', 'Books in array should contain _id');
              done();
            });
      });      
      
    });


    suite('GET /api/books/[id] => book object with [id]', function(){
      
      test('Test GET /api/books/[id] with id not in db',  function(done){
        chai.request(server)
            .get('/api/books/1234567890')
            .end(function(err, res){
              assert.equal(res.status, 200);
              assert.isString(res.text);
              assert.equal(res.text, 'no book exists', 'Should retrieve an error message if no book exists');
              done();
            });
      });
      
      test('Test GET /api/books/[id] with valid id in db',  function(done){
        chai.request(server)
            .get('/api/books/' + bookId)
            .end(function(err, res){
              assert.equal(res.status, 200);
              assert.isObject(res.body, 'response should be an book object');
              assert.property(res.body, 'comments', 'Book object should contain comments');
              assert.isArray(res.body.comments, 'Comments should be an array')
              assert.property(res.body, 'title', 'Book object should contain title');
              assert.property(res.body, '_id', 'Book object should contain _id');
              done();
            });
      });
      
    });


    suite('POST /api/books/[id] => add comment/expect book object with id', function(){
      
      test('Test POST /api/books/[id] with comment', function(done){
        chai.request(server)
            .post('/api/books/' + bookId)
            .type('form')
            .send({
              comment: "test comment"
            })
            .end((err, res) => {
              assert.equal(res.status, 200);
              assert.isObject(res.body, 'response should a book object');
              assert.property(res.body, 'title', 'Return object should have title property');
              assert.property(res.body, '_id', 'Return object should have _id property');
              assert.property(res.body, 'comments', 'Return object should have comments property');
              assert.isArray(res.body.comments, 'Comments should be an array');
              done()
            })
      });

      test('Test POST /api/books/[id] without comment field', function(done){
        chai.request(server)
            .post('/api/books/' + bookId)
            .type('form')
            .send({
              comment: null
            })
            .end((err, res) => {
              assert.equal(res.status, 200);
              assert.isNotNull(res.text, 'should receive String message')
              assert.equal(res.text, 'missing required field comment', 'should receive error message if comment field is missing')
              done()
            })
      });

      test('Test POST /api/books/[id] with comment, id not in db', function(done){
        chai.request(server)
            .post('/api/books/invalid_id')
            .type('form')
            .send({
              comment: "test comment 2"
            })
            .end((err, res) => {
              assert.equal(res.status, 200);
              assert.isNotNull(res.text, 'should receive String message')
              assert.equal(res.text, 'no book exists', 'should receive error message if given invalid id');
              done()
            })
      });
      
    });

    suite('DELETE /api/books/[id] => delete book object id', function() {

      test('Test DELETE /api/books/[id] with valid id in db', function(done){
        chai.request(server)
                .delete('/api/books/' + bookId)
                .end((err, res) => {
                    assert.equal(res.status, 200);
                    assert.equal(res.text, 'delete successful', 'should retrieve success message when completed');
                    done();
                });
      });

      test('Test DELETE /api/books/[id] with  id not in db', function(done){
        chai.request(server)
                .delete('/api/books/invalid_id')
                .end((err, res) => {
                    assert.equal(res.status, 200);
                    assert.equal(res.text, 'no book exists', 'should retrieve error message when given an invalid id');
                    done();
                });
      });

    });

  });

});
