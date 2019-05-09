var current = 0;
$('#container').on('click', '.answer-button', function(){
  if (!$(".can").hasClass("hide")) return;
  var isCorrect = $(this).checkAnswer();
  var msg = "NO TE PREOCUPES, SEGURO LA SIGUIENTE ACERTARÁS";
  if (isCorrect) {
    msg = "¡ACERTASTE, ERES EL MEJOR!";
    $(this).addClass('correcto').removeClass('answer-button');
  }else{
    $(this).addClass('incorrecto').removeClass('answer-button');
  }
  $('#message').html(msg);
  //$('.fadeInUp').addClass('hide').removeClass('fadeInUp');
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
    $('.body-second-style').removeClass('body-second-style').addClass('body');
    if(points === 0){
      $('.result-message').html("No obtuviste ninguna estrella. Inténtalo de nuevo! ");
      $('.result-message').append($('<img>',{id:'star',src:'assets/img/resultado_quiz/happy_face.png', width: '50px', height: '50px'}))
      $('.stars').append($('<img>',{id:'star',src:'assets/img/resultado_quiz/no-star.png', width: '150px', height: '150px'}))
      $('.stars').append($('<img>',{id:'star',src:'assets/img/resultado_quiz/no-star.png', width: '150px', height: '150px'}))
      $('.stars').append($('<img>',{id:'star',src:'assets/img/resultado_quiz/no-star.png', width: '150px', height: '150px'}))
    }else if (points === 1){
      $('.result-message').html("Puedes mejorar. ¡Inténtalo de nuevo! ");
      $('.result-message').append($('<img>',{id:'star',src:'assets/img/resultado_quiz/think_face.png', width: '50px', height: '50px'}))
      $('.stars').append($('<img>',{id:'star',src:'assets/img/resultado_quiz/star.png', width: '150px', height: '150px'}))
      $('.stars img').addClass('animated heartBeat estrellas');  
      $('.stars').append($('<img>',{id:'star',src:'assets/img/resultado_quiz/no-star.png', width: '150px', height: '150px'}))
      $('.stars').append($('<img>',{id:'star',src:'assets/img/resultado_quiz/no-star.png', width: '150px', height: '150px'}))
    }else if (points === 2){
      $('.result-message').html("¡Muy bien! ");
      $('.result-message').append($('<img>',{id:'star',src:'assets/img/resultado_quiz/tongue_face.png', width: '50px', height: '50px'}))
      $('.stars').append($('<img>',{id:'star',src:'assets/img/resultado_quiz/star.png', width: '150px', height: '150px'}))
      $('.stars').append($('<img>',{id:'star',src:'assets/img/resultado_quiz/star.png', width: '150px', height: '150px'}))
      $('.stars img').addClass('animated heartBeat estrellas');
      $('.stars').append($('<img>',{id:'star',src:'assets/img/resultado_quiz/no-star.png', width: '150px', height: '150px'}))
    }else if (points === 3){
      $('.result-message').html("¡Felicidades! Demuestra tus habilidades en los demás niveles y categorías.<br>");
      $('.result-message').append($('<img>',{id:'star',src:'assets/img/resultado_quiz/celebration.png', width: '50px', height: '50px'}))
      $('.result-message').append($('<img>',{id:'star',src:'assets/img/resultado_quiz/happy_face.png', width: '50px', height: '50px'}))
      $('.stars').append($('<img>',{id:'star',src:'assets/img/resultado_quiz/star.png', width: '150px', height: '150px'}))
      $('.stars').append($('<img>',{id:'star',src:'assets/img/resultado_quiz/star.png', width: '150px', height: '150px'}))
      $('.stars').append($('<img>',{id:'star',src:'assets/img/resultado_quiz/star.png', width: '150px', height: '150px'}))
      $('.stars img').addClass('animated heartBeat estrellas');
    }
  } else {
    $(items[current]).addClass('fadeInUp').removeClass('hide');
  }
}

$('#container').on('click','#reload', function(){
  $('.body').removeClass('body').addClass('body-second-style');
  $('.correcto'). removeClass('correcto').addClass('answer-button');
  $('.incorrecto'). removeClass('incorrecto').addClass('answer-button');
  $('.stars').empty();
  current = - 1;
  showNext(current);
});

$('#container').on('click','#menu', function(){
  $('.body-second-style').removeClass('body-second-style').addClass('body');
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