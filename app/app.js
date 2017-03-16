var express = require('express');
var path = require('path');
var app = express();

var logger = require('./logger');
app.use(logger);

app.use(express.static(path.join(__dirname, '../dist')));

var fruits = require('./routes/fruits');
app.use('/fruits', fruits);

// intercepted params

app.param('route', function(request, response, next) {
  request.normalizedRoute = request.params.route.toLowerCase();
  next();
});

// endpoints

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
