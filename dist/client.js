$(function() {

  var fruitsUrl = '/fruits';

  function appendFruit(fruit) {
    var target = $('.test-style').find('ul');
    target.append('<li><a class="remove" href="#">(x)</a> <span>' + fruit + '</span></li>');
  }

  $.get(fruitsUrl, function(response) {
    for (var i = 0; i < response.length; i++) {
      appendFruit(response[i]);
    }
  });

  $('form').on('submit', function(event) {
    event.preventDefault();
    var fruitData = $(this).serialize();
    $.ajax({
      type: 'POST',
      url: fruitsUrl,
      data: fruitData,
    }).done(function(newFruit) {
      appendFruit(newFruit);
    });
  });

  $('.test-style').find('ul').on('click', '.remove', function(event) {
    if (!confirm('Are you sure you want to delete this fruit?')) {
      return false;
    }
    var target = $(this).closest('li');
    var fruit = target.find('span').text();
    $.ajax({
      type: 'DELETE',
      url: fruitsUrl + '/' + fruit,
    }).done(function() {
      target.remove();
    });
  });

});
