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
    Book.findOne({book_title: bookTitle}, (err, foundBook) => {
        if(err) return done("Book can not be created")
        if(!foundBook){
            let newBook = new Book({
                book_title: bookTitle,
                commentcount: 0
            });
            newBook.save((err, data) => {
                if(err) return done("Book can not be created");
                done(null, data);
            });
        } else {
            done("Book with the title:" + foundBook.book_title + " already exists")
        }
    });
};
const deleteAllBooks = (done) => {
    Book.remove({}, (err, deletedBooks) => {
        if(err) return done("Failed to delete all books");
        if(deletedBooks){
            done(null, deletedBooks);
        } else {
            done("Failed to delete all books");
        }
    });
};
const getOneBook = (done) => {
    
};
const createBookComment = (done) => {
    
};
const deleteOneBook = (done) => {
    
};

module.exports = {
    getBooks: getBooks,
    createBook: createBook,
    deleteAllBooks: deleteAllBooks,
    getOneBook: getOneBook,
    createBookComment: createBookComment,
    deleteOneBook: deleteOneBook,
};