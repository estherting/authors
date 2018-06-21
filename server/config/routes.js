const Handler = require('../controllers/authors.js')

module.exports = function Routify(app){
  app.get('/api/authors/:id', function(req, res){
    Handler.author(req, res);
  })
  app.get('/api/authors/', function(req, res){
    Handler.authors(req, res);
  })
  app.post('/authors', function(req, res){
    Handler.newAuthor(req, res);
  })
  app.post('/authors/write/:id', function(req, res){
    console.log('got into routes')
    Handler.newQuote(req, res);
  })
  app.post('/quotes/:quoteId/:authorId', function(req, res){
    Handler.vote(req, res);
  })
  app.put('/authors/:id', function(req, res){
    Handler.editAuthor(req, res);
  })
  app.delete('/authors/:id', function(req, res){
    console.log('got to routes.js')
    Handler.deleteAuthor(req, res)
  })
  app.delete('/authors/:authorId/:quoteId', function(req, res){
    Handler.deleteQuote(req, res)
  })
}
