var content = {};
$.get("assets/js/idiomy.json",function(data) {
  content = JSON.parse(data);
  if (localStorage.getItem('score') == null) {
    generateScoreRegistry(content.Categories);
  }
});
$(function() {
  if (!storageAvailable('localStorage')) {
    $('#container').html('Debes habilitar el almacenamiento local en tu navegador.');
  } else {
    //reinicia los datos guardados en el navegador
    //localStorage.removeItem("skip");
    //localStorage.removeItem("score");
    if(!localStorage.getItem('skip') === true) {
      $('#container').load('assets/templates/welcome.html');
    } else {
      $('#container').load('assets/templates/panel.html',function(){
        var categories = content.Categories;
        renderPanel(categories);
      });
    }
  }
  $('#container').on('click', '.testinit', function(){
    $(this).renderQuiz(content.Categories.items);
  });
  $('#container').on('click','.skip-intro',function(e){
    e.preventDefault();
    var chk = document.getElementById("remember").checked;
    console.log(chk);
    if (chk) {
      localStorage.setItem("skip", "true");
    }
    var categories = content.Categories;
    renderPanel(categories);
  });
});
