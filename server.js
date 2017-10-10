var express = require('express');
var session = require('express-session');
// Create an Express App
var app = express();
//-----------------------------------
var mongoose =require('mongoose');
mongoose.connect('mongodb://localhost/WWW');

var QuoteSchema = new mongoose.Schema({
 name: {type: String, required: true, minlength: 6},
 quote: {type: String, required: true, minlenth: 10}
},{timestamps: true })
mongoose.model('Quote', QuoteSchema); // We are setting this Schema in our Models as 'User'
var Quote = mongoose.model('Quote') // We are retrieving

var bodyParser = require('body-parser');
// Integrate body-parser with our App
app.use(session({secret: 'secretCode'}));
app.use(bodyParser.urlencoded({ extended: true }));
// Require path
var path = require('path');
// Setting our Static Folder Directory
app.use(express.static(path.join(__dirname, './static')));
// Setting our Views Folder Directory
app.set('views', path.join(__dirname, './views'));
// Setting our View Engine set to EJS
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
  res.render('index')
})
app.post('/add_quote',function(req,res){

  // var quote = new Quote({name: req.body.name, age: req.body.quote});
  var quote = new Quote(req.body);

  quote.save(function(err){
    if(err){
      // console.log(err);
      // console.log(quote.errors);
      // console.log(quote.errors);
      res.render('index', {errors: quote.errors})
      // simplify the message and errors
    } else {
      console.log('successful');
      res.redirect('/quotes')
    }
  })
})

app.get('/quotes', function(req, res) {

  Quote.find({}).exec( function (err, quotes) {
    if (!err) {
      console.log("Show quotes");
      res.render('quote', {quotes: quotes})
    } else {
      console.log("Error: dont show quotes");
      res.render('quote', {quotes: false});
    }
  })

  })

  // Quote.find({}, function(quotes) {
  //   console.log(quotes, 'its working    xxxxxxxx');
  //   res.render('quote',{quotes: quotes})
  // })
// })

app.listen(8000, function() {
    console.log("listening on port 8000");
})
