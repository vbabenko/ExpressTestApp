var express = require('express');
var app = express();

var fs = require('fs');
var _ = require('lodash');
var users = [];
var engines = require('consolidate');

app.engine('hbs', engines.handlebars);
app.set('views', './views');
app.set('view engine', 'hbs');

fs.readFile('users.json', function(err, data) {
  if (err) throw err;

  JSON.parse(data).forEach(function(user) {
    user.name.full = _.startCase(user.name.first + " " + user.name.last);
    users.push(user);
  });

});

app.get('/', function(req, res) {
  res.render('index', {users: users});
});

app.use('/profilepics/', express.static('images'));

app.get('/:username', function(req, res) {
  var username = req.params.username;
  res.render('user', {username: username});
});

var server = app.listen(3000, function() {
  console.log('The server is running at http://localhost:' + server.address().port)
});