const { Book } = require('./DB.js');

// Database methods.

const getBooks = (done) => {
    let bookQuery = Book.find({});
    bookQuery.select('-__v');
    bookQuery.select('-comments');
    bookQuery.exec((err, allBooks) => {
        if(err) return done("Can not retrieve books")
        if(allBooks){
            done(null, allBooks);
        } else {
            done("Can not retrieve books");
        }
    });
};
const createBook = (bookTitle, done) => {
    Book.findOne({title: bookTitle}, (err, foundBook) => {
        if(err) return done("Book can not be created")
        if(!foundBook){
            let newBook = new Book({
                title: bookTitle,
                commentcount: 0
            });
            newBook.save((err, data) => {
                if(err) return done("Book can not be created");
                done(null, data);
            });
        } else {
            done("Book with the title:" + foundBook.title + " already exists")
        }
    });
};
const deleteAllBooks = (done) => {
    Book.deleteMany({}, (err, deletedBooks) => {
        if(err) return done("Failed to delete all books");
        if(deletedBooks){
            done(null, deletedBooks);
        } else {
            done("Failed to delete all books");
        }
    });
};
const getOneBook = (bookId, done) => {
    let bookQuery = Book.find({_id: bookId});
    bookQuery.select('-__v');
    bookQuery.exec((err, bookFound) => {
        if(err) return done("no book exists")
        if(bookFound){
            done(null, bookFound);
        } else {
            done("no book exists");
        }
    });
};
const createBookComment = (bookId, comment, done) => {
    let bookQuery = Book.findOne({_id: bookId});
    bookQuery.select('-__v');
    bookQuery.exec((err, bookFound) => {
        if(err) return done("Can not create comment");
        if(bookFound){
            bookFound.comments.push(comment);
            bookFound.commentcount++ ;
            bookFound.save((err, data) => {
                if(err) return done("can not create comment");
                done(null, data);
            });
        } else {
            done("no book exists");
        }
    })
};
const deleteOneBook = (bookId, done) => {
    Book.findOneAndDelete({_id: bookId}, (err, deletedBook) => {
        if(err) return done("Can not delete");
        if(deletedBook){
            done(null, deletedBook);
        } else {
            done("no book exists")
        }
    });
};

module.exports = {
    getBooks: getBooks,
    createBook: createBook,
    deleteAllBooks: deleteAllBooks,
    getOneBook: getOneBook,
    createBookComment: createBookComment,
    deleteOneBook: deleteOneBook,
};