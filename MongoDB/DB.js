var mongoose = require('mongoose');
mongoose.connect(process.env.DB, { useNewUrlParser: true, useUnifiedTopology: true })

// DB Schemas.
const Schema = mongoose.Schema;

const bookSchema = new Schema({
    book_title: {type: String, required: true},
    commentcount: {type: Number, required: true},
    comments: {type: [String]}
});

// Create DB model.
let Book = mongoose.model("book", bookSchema);

// Export DB models.
module.exports = {Book: Book};