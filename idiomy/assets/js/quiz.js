var current = 0;
$('#container').on('click', '.answer-button', function(){
  var isCorrect = $(this).checkAnswer();
  var msg = "fail";
  if (isCorrect) {
    msg = "OK";
  }
  $('#message').html(msg);
  $('.fadeInUp').addClass('hide').removeClass('fadeInUp');
  $('.can').removeClass('hide').addClass('fadeInUp');
});

$('#container').on('click','.next-button', function(){
  showNext(current);
});

function showNext(n) {
  $('.fadeInUp').addClass('hide').removeClass('fadeInUp');
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
    $('.resume').removeClass('hide').addClass('fadeInUp');
    var result = points + " of " + items.length;
    $('.result').html(result);
  } else {
    $(items[current]).addClass('fadeInUp').removeClass('hide');
  }
}

$('#container').on('click','#reload', function(){
  current = - 1;
  showNext(current);
});

$('#container').on('click','#menu', function(){
  current = 0;
  $('#container').load('assets/templates/panel.html',function(){
    renderPanel(categories);
  });
});

$('#container').on('click','#levels', function(){
  current = 0;
  $('#container').load('assets/templates/levels.html',function(){
    renderLevels(categories);
  });
});

function showLevels(){
  $(this).parent().children('.hide').removeClass("hide");
}