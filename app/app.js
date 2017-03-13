var express = require('express');
var app = express();

app.get('/', function(request, response) {
  response.send("Hello World");
});

app.get('/json_endpoint', function(request, response) {
  var fruits = ['apples', 'bananas', 'plums'];
  response.json(fruits);
});

app.get('/html_endpoint', function(request, response) {
  var template = '<ul><li>item 1</li><li>item 2</li><li>item 2</li></ul>';
  response.send(template);
});

app.get('/redirect_me', function(request, response) {
  response.redirect(301, '/');
});

app.listen(3000, function() {
  console.log('Listening on port 3000');
});
