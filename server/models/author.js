const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/authorDB');

var QuoteSchema = new mongoose.Schema({
  content: {type: String, required: [true, "Quote is required"], minlength: [3, "Quote must be at least 3 characters"]},
  votes: {type: Number, default: 0}
})
var AuthorSchema = new mongoose.Schema({
  name: {type: String, required: [true, "name is required!"], minlength: [3, "Name must be at least 3 characters"]},
  quotes: [QuoteSchema]
})



module.exports = {
  author: mongoose.model("Author", AuthorSchema),
  quote: mongoose.model("Quote", QuoteSchema)
}
