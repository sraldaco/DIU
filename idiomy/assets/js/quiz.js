var current = 0;
$('#container').on('click', '.answer-button', function(){
  var isCorrect = $(this).checkAnswer(content.Categories.items);
  var msg = "fail";
  if (isCorrect) {
    msg = "OK";
  }
  $('#message').html(msg);
  $('.fadeIn').addClass('hide').removeClass('fadeIn');
  $('.can').removeClass('hide').addClass('fadeIn');
});

$('#container').on('click','.next-button', function(){
  showNext(current);
});

function showNext(n) {
  $('.fadeIn').addClass('hide').removeClass('fadeIn');
  current++;
  var items = $('.question');
  var size = items.length;
  if (size - 1 < current) {
    var quizData = $('#quiz-data');
    var category = quizData.attr('data-category');
    var quiz = quizData.attr('data-quiz');
    var points = 0;
    var score = JSON.parse(localStorage.getItem("score"));
    var answers = score["category"+category]["quiz"+ quiz];
    for(var answer in answers){
      points += answers[answer].points;
    }
    $('.resume').removeClass('hide').addClass('fadeIn');
    var result = points + " of " + items.length;
    $('.result').html(result);
    console.log($('.result'));
  } else {
    $(items[current]).addClass('fadeIn').removeClass('hide');
  }
}

$('#container').on('click','#reload', function(){
  current = - 1;
  showNext(current);
});

$('#container').on('click','#menu', function(){
  location.reload();
});
