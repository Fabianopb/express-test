$(function() {

  $.get('/json_endpoint', function(response) {
    var container = $('.test-style').find('ul');
    for (var i = 0; i < response.length; i++) {
      container.append('<li><a class="remove" href="#">(x)</a> ' + response[i] + '</li>')
    }
  });

});
