var express = require('express');
var router = express.Router();

var bodyParser = require('body-parser');
var parseUrlencoded = bodyParser.urlencoded({ extended: false });

// database
var fruits = ['apples', 'bananas', 'plums'];

router.route('/')
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

router.route('/:name')
  .delete(function(request, response) {
    fruits.splice(fruits.indexOf(request.params.name), 1);
    response.sendStatus(200);
  });

module.exports = router;
