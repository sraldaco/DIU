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

    if(points < 1){
      $('.stars').html("No obtuviste ninguna estrella. Inténtalo de nuevo! ");
      $('.stars').append($('<img>',{id:'star',src:'assets/img/resultado_quiz/happy_face.png', width: '50px', height: '50px'}))
    }else{
      for(var i = 0; i < points; i++){
        $('.stars').append($('<img>',{id:'star',src:'assets/img/resultado_quiz/star.png', width: '50px', height: '50px'}))
      }
    }
  } else {
    $(items[current]).addClass('fadeInUp').removeClass('hide');
  }
}

$('#container').on('click','#reload', function(){
  //$('.stars').remove();
  current = - 1;
  showNext(current);
});

$('#container').on('click','#menu', function(){
  current = 0;
  $('#container').load('assets/templates/panel.html',function(){
    renderPanel(categories);
  });
});

$('#container').on('click','.skip',function(){
  showQuiz();
});

$('#container').on('click','.next-intro',function(){
  var target = $(this).attr("data-target");
  var items = $(".intro.item");
  if (target < items.length) {
    $(".intro.item.fadeInUp").removeClass("fadeInUp").addClass("hide");
    $(items[target]).addClass("fadeInUp").removeClass("hide");
  } else {
    showQuiz();
  }
});

function showQuiz() {
  $("#intro").addClass("hide");
  $(".quiz.items").removeClass("hide");
}