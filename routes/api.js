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
        if(!title) return res.send('missing required field title');
        createBook(title, (err, newBook) => {
        if(err) return res.json({error: err});
        res.json({
            _id: newBook._id,
            title: newBook.title
        });
        });
    })
    
    .delete(function(req, res){
        // Delete all Books and respond with and returns result
        deleteAllBooks((err, deletedBooks) => {
            if(err) return res.json({error: err});
            res.send('complete delete successful');
        })
    });



  app.route('/api/books/:id')
    .get(function (req, res){
      let bookid = req.params.id;
      getOneBook(bookid, (err, foundBook) => {
        if(err) return res.send(err);
        res.json(foundBook);
      });
      //json res format: {"_id": bookid, "title": book_title, "comments": [comment,comment,...]}
    })
    
    .post(function(req, res){
      let bookid = req.params.id;
      let comment = req.body.comment;
      if(!comment) return res.send('missing required field comment');
      createBookComment(bookid, comment, (err, updatedBook) => {
        if(err) return res.send(err);
        res.json(updatedBook);
      });
      //json res format same as .get
    })
    
    .delete(function(req, res){
      let bookid = req.params.id;
      deleteOneBook(bookid, (err, deletedBook) => {
          if(err) return res.send(err);
          res.send('delete successful');
      });
      //if successful response will be 'delete successful'
    });
  
};
