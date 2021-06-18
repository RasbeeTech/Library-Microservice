var mongoose = require('mongoose');
mongoose.connect(process.env.DB, { useNewUrlParser: true, useUnifiedTopology: true })

// DB Schemas.
const Schema = mongoose.Schema;

const bookSchema = new Schema({
    title: {type: String, required: true},
    commentCount: {type: Number, required: true}
});

// Create DB model.
let Book = mongoose.model("book", bookSchema);

// Export DB models.
module.exports = {Book: Book};