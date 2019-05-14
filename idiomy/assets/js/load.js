//reinicia los datos guardados en el navegador
//localStorage.removeItem("score");
var content = {}, categories = {};
$(function() { 
  if (!storageAvailable('localStorage')) {
    $('#container').html('Debes habilitar el almacenamiento local en tu navegador.');
  } else {
    $.getJSON("assets/js/idiomy.json", function(data) {
      //content = JSON.parse(data);
      content = data;
      categories = content.Categories;
      if (localStorage.getItem('score') == null) {
        generateScoreRegistry();
      }
      appLoad();
    });
  }
  $('#container').on('click', '.testinit', function(){
    $(this).renderQuiz(0,0);
    $('.body').removeClass('body').addClass('body-second-style');
  });

  /**
   * Recargamos las introducciones a las preguntas según el nivel 
   * en cual se encuentra la partida actual
   */
  $('#container').on('click', '.volver-intros', function(){
    $('.body').removeClass('body').addClass('body-second-style');
    $('.correcto'). removeClass('correcto').addClass('answer-button');
    $('.incorrecto'). removeClass('incorrecto').addClass('answer-button');
    $('.stars').empty();
    current = - 1;
    showNext(current);
    $(this).volverIntros();//Llamamos a la función para obtener las introducciones actuales
  });

  $('#container').on('click','.skip-intro',function(e){
    e.preventDefault();
    renderPanel(categories);
  });

  $('#container').on('click','.level',function(e){
    $(this).renderLevels();
  });
});
