$(function() {

  function appendFruit(fruit) {
    var container = $('.test-style').find('ul');
    container.append('<li><a class="remove" href="#">(x)</a> ' + fruit + '</li>');
  }

  $.get('/json_endpoint', function(response) {
    for (var i = 0; i < response.length; i++) {
      appendFruit(response[i]);
    }
  });

  $('form').on('submit', function(event) {
    event.preventDefault();
    var fruitData = $(this).serialize();
    $.ajax({
      type: 'POST',
      url: '/json_endpoint',
      data: fruitData,
    }).done(function(newFruit) {
      appendFruit(newFruit);
    });
  });

});
