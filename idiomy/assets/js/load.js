//reinicia los datos guardados en el navegador
//localStorage.removeItem("skip");
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
    $(this).renderQuiz();
  });
  $('#container').on('click','.skip-intro',function(e){
    e.preventDefault();
    var chk = document.getElementById("remember").checked;
    if (chk) {
      localStorage.setItem("skip", "true");
    }
    renderPanel(categories);
  });

  $('#container').on('click','.level',function(e){
    $(this).renderLevels();
  });
});
