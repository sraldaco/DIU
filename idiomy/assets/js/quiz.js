var current = 0;
$('#container').on('click', '.answer-button', function(){
  var isCorrect = $(this).checkAnswer(content.Categories.items);
  var msg = "fail";
  if (isCorrect) {
    msg = "OK";
  }
  $('#message').html(msg);
  $(this).parents('.question').addClass('fadeOutRight').delay(1000).addClass('hide');
  showNext(current);
});

function showNext(n) {
  current++;
  var items = $('.question');
  var size = items.length;
  if (size - 1 < current) {
    console.log((size-1) + " < " + current);
  }
  $(items[current]).removeClass('hide').addClass('fadeInLeft');
  //console.log();
}
