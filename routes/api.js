'use strict';
const { getBooks } = require('../mongodb/dbMethods.js');
const { createBook } = require('../mongodb/dbMethods.js');
const { deleteAllBooks } = require('../mongodb/dbMethods.js');
const { getOneBook } = require('../mongodb/dbMethods.js');
const { createBookComment } = require('../mongodb/dbMethods.js');
const { deleteOneBook } = require('../mongodb/dbMethods.js');

module.exports = function (app) {

  app.route('/api/books')
    .get(function (req, res){
        // response will be array of book objects
        // json res format: [{"_id": bookid, "title": book_title, "commentcount": num_of_comments },...]
        getBooks((err, allBooks) => {
            if(err) return res.json({error: err});
            res.json(allBooks);
        });
    })
    
    .post(function (req, res){
        //response will contain new book object
        let title = req.body.title;
        if(!title) return res.json({error: 'missing required field title'});
        createBook(title, (err, newBook) => {
        if(err) return res.json({error: err});
        res.json({
            _id: newBook._id,
            book_title: newBook.book_title
        });
        });
    })
    
    .delete(function(req, res){
        // Delete all Books and respond with and returns result
        deleteAllBooks((err, deletedBooks) => {
            if(err) return res.json({error: err});
            res.json({
                result: 'complete delete successful'
            });
        })
    });



  app.route('/api/books/:id')
    .get(function (req, res){
      let bookid = req.params.id;
      //json res format: {"_id": bookid, "title": book_title, "comments": [comment,comment,...]}
    })
    
    .post(function(req, res){
      let bookid = req.params.id;
      let comment = req.body.comment;
      //json res format same as .get
    })
    
    .delete(function(req, res){
      let bookid = req.params.id;
      //if successful response will be 'delete successful'
    });
  
};
