const Author = require('../models/author.js').author;
const Quote = require('../models/author.js').quote;

module.exports = {
  authors: authors,
  author: author,
  newAuthor: newAuthor,
  newQuote: newQuote,
  newQuote: newQuote,
  vote: vote,
  editAuthor: editAuthor,
  deleteAuthor: deleteAuthor,
  deleteQuote: deleteQuote,
}

function authors(req, res){
  Author.find({}, function(err, result){
    if(err){
      console.log('err in finding all authors', err)
    }
    console.log('successfully retrieving all authors')
    res.json({authors: result})
  })
}

function author(req, res){
  Author.findOne({_id:req.params.id}, function(err, result){
    if(err){
      console.log('err in finding author', err)
    }
    console.log('successfully retrieving one author')
    res.json({author: result})
  })
}

function newAuthor(req, res){
  // validate uniqueness
  Author.find({name: req.body.name})
    .then(data => {
      console.log('this author already exists! ', data)
      if(data.length){
        console.log('This author already exists ')
        res.json({error: ["This author already exists"]})
      } else {
        // author is unique...let's add!
        Author.create(req.body)
          .then(data => res.json({authors: data}))
          .catch(err => {
            let error = [];
            for(var key in err.errors){
              error.push(err.errors[key].message)
              console.log('err in creating author', err.errors[key].message)
            }
            res.json({error: error});
          })
      }
    })
    .catch(err => {
      //
    })
}

function newQuote(req, res){
  Quote.create(req.body)    // add quote to quote schema
    .then((quoteData) => console.log('created new quote'))
    .then((quoteData) => Author.findByIdAndUpdate(req.params.id, {$push: {quotes: req.body}}, {new:true})) // add quote to author schema
    .then((authorData) => res.json({author: authorData}))
    .catch(err => {
      let error = [];
      for(var key in err.errors){
        error.push(err.errors[key].message)
        console.log('err in creating quote', err.errors[key].message)
      }
      res.json({error: error});
    })
}

function vote(req, res){
  Author.findOneAndUpdate({_id:req.params.authorId, 'quotes._id': req.params.quoteId}, {$inc: {'quotes.$.votes': req.body.voting}}, {new:true})
    .then(data => console.log('updated my quote voting', data))
    .then(data => res.json({author: data}))
    .catch(err => console.log('error!', err))
}

function editAuthor(req, res){
  Author.findByIdAndUpdate(req.params.id, {$set: {name:req.body.name}}, {new:true, runValidators: true}, function(err, result){
    if(err){
      for(var key in err.errors){
        console.log('err in updating author', err.errors[key].message)
        res.json({error: err.errors[key].message});
      }
    } else {
      console.log('successfully updated author', result)
      res.json({authors: result})
    }
  })
}

function deleteAuthor(req, res){
  console.log('got into delete function ')
  Author.findByIdAndRemove(req.params.id, function(err, result){
    if(err){
      console.log('err in deleting author', err)
      res.json(err)
    }
    console.log('successfully deleted author', result)
    res.json(result)
  })
}

function deleteQuote(req, res){
  Author.findOneAndUpdate(req.params.authorId, {$pull: {'quotes': { _id: req.params.quoteId}}}, {new:true})
    .then(data => console.log('deleted my quote', data))
    .then(data => res.json({author: data}))
    .catch(err => console.log('error!', err))
}
