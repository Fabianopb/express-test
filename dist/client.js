$(function() {

  $.get('/json_endpoint', function(response) {
    $('.test-style').html(response.join(', '));
  });

});
