var express = require('express');
var path = require('path');
var app = express();

var bodyParser = require('body-parser');
var parseUrlencoded = bodyParser.urlencoded({ extended: false });

var logger = require('./logger');
app.use(logger);

// database
var fruits = ['apples', 'bananas', 'plums'];

// middleware

app.use(express.static(path.join(__dirname, '../dist')));

// intercepted params

app.param('route', function(request, response, next) {
  request.normalizedRoute = request.params.route.toLowerCase();
  next();
});

// endpoints

app.route('/json_endpoint')
  .get(function(request, response) {
    var limit = request.query.limit;
    if (limit) {
      if (limit >= 1 && limit <= fruits.length) {
        response.json(fruits.slice(0, limit));
      } else {
        response.status(400).json('Invalid limit! Valid is from 1 to ' + fruits.length);
      }
    } else {
      response.json(fruits);
    }
  })
  .post(parseUrlencoded, function(request, response) {
    var newFruit = request.body.fruit;
    fruits.push(newFruit)
    response.status(201).json(newFruit);
  });

app.delete('/json_endpoint/:name', function(request, response) {
  fruits.splice(fruits.indexOf(request.params.name), 1);
  response.sendStatus(200);
});

app.get('/html_endpoint', function(request, response) {
  var template = '<ul><li>item 1</li><li>item 2</li><li>item 2</li></ul>';
  response.send(template);
});

app.get('/redirect_me', function(request, response) {
  response.redirect(301, '/');
});

app.get('/dynamic/:route', function(request, response) {
  var cities = {
    'paris': 'Eiffel Tower and Champs Elyseés',
    'lisbon': 'Belém Tower and Alfama',
    'barcelona': 'Parque Guell and Las Remblas'
  };
  var touristPoints = cities[request.normalizedRoute];
  if (touristPoints) {
    response.json(touristPoints);
  } else {
    response.status(404).json('Sorry, we don\'t have info for this city');
  }
});

app.listen(3000, function() {
  console.log('Listening on port 3000');
});
