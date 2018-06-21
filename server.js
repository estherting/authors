const express = require('express');
const session = require('express-session')
const flash = require('express-flash')
const app = express();
var path = require("path");
var bodyParser = require('body-parser');

app.use(express.static(__dirname + "/client/dist/client"));
app.use(bodyParser.json());   // IMPORTANT!!!!!!!!!!!!!!!!!!!!!!!
app.use(flash());
app.use(session({
  secret: 'keyboardkitteh',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60000 }
}))


require('./server/config/routes.js')(app);

app.all("*", (req,res,next) => {
  res.sendFile(path.resolve("./client/dist/client/index.html"))
});

app.listen(8000, function() {
 console.log("listening on port 8000");
});
