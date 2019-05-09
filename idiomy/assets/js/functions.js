function appLoad() {
  if(!localStorage.getItem('skip') === true) {
    $('#container').load('assets/templates/welcome.html');
  } else {
    $('#container').load('assets/templates/panel.html',function(){
      renderPanel(categories);
    });
  }
}
function renderPanel() {
  $('#container').load('assets/templates/panel.html',function(){
    var template = $.templates("#panel");
    var htmlOutput = template.render(categories);
    $('#container').html(htmlOutput);
  });
}

function renderIntro() {
  $('#container').load('assets/templates/introduccion.html',function(){
    var template = $.templates("#intros");
    var htmlOutput = template.render(categories);
    $('#container').html(htmlOutput);

  });
}

$.fn.renderLevels = function() {
  var categoryID = this.attr('data-category');
  var levels = categories.items[categoryID-1];
  $('#container').load('assets/templates/levels.html',function(){
    var template = $.templates("#levels");
    var htmlOutput = template.render(levels);
    $('#container').html(htmlOutput);
    var score = JSON.parse(localStorage.getItem("score"));
    $('.score').each(function(){
      $(this).printScorePanel(score);
    });
  });
}


$.fn.renderQuiz = function (){
  var categoryID = this.attr('data-category');
  var quizID = this.attr('data-quiz');
  $('#container').load('assets/templates/quiz.html',
    function() {
      var quiz = categories.items[categoryID-1].quiz[quizID-1];
      quiz['category'] = categoryID;
      var template = $.templates("#quiz");
      var htmlOutput = template.render(quiz);
      $('#container').html(htmlOutput);
      $('#items').load('assets/templates/question.html',
        function() {
          quiz.questions.forEach(function(question, index){
            template = $.templates("#question");
            htmlOutput = template.render(question);
            $('#items').append(htmlOutput);
          });
        }
      );
    }
  );
}

$.fn.checkAnswer = function (){
  var quizData = this.parents('#quiz-data');
  var category = quizData.attr('data-category');
  var quiz = quizData.attr('data-quiz');
  var question = this.parents('.question').attr('data-question');
  var answer = this.attr('data-answer');
  var correct = categories.items[category - 1].quiz[quiz - 1].questions[question - 1].correct;
  var compare = answer == correct ? true : false;
  var point = compare ? 1 : 0;
  var score = JSON.parse(localStorage.getItem("score"));
  score["category"+category]["quiz"+ quiz]["question"+ question]["points"] = point;
  localStorage.setItem("score",JSON.stringify(score));
  return compare;
}

$.fn.printScorePanel = function(element) {
  var category = this.attr('data-category');
  var quiz = this.attr('data-quiz');
  var count=0, i = 0;
  var quizData = new Array();
  quizData = element["category"+category]["quiz"+quiz];
  for(var key in quizData) {
    count += quizData[key].points;
    i++;
  }
  var score = "<span class='score-foreground score-"+ (count/i*100).toFixed(0) + "'></span>";
  this.html(score);
}

$.fn.scoreResume = function(element) {
  var count=0;
  for(var key in element) {
    count += quizData[key].points;
  }
  return count;
}

function generateScoreRegistry(){
  score = {};
  categories.items.forEach(function(category){
    score["category"+category.id] = getQuizes(category.quiz);
  });
  console.log(score);
  localStorage.setItem("score",JSON.stringify(score));
}

function getQuizes(category) {
  quizes = {};
  category.forEach(function(quiz){
    quizes["quiz"+quiz.id] = getQuestion(quiz.questions);
  });
  return quizes;
}

function getQuestion(quiz) {
  questions = {};
  quiz.forEach(function(element){
    questions["question"+element.id] = {"points" : 0};
  });
  return questions;
}
