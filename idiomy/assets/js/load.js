var content = new Array();
$.get("assets/js/idiomy.json",function(data) {
  content = JSON.parse(data);
});
$(function() {
  if (!storageAvailable('localStorage')) {
    $('#container').html('Debes habilitar el almacenamiento local en tu navegador.');
  } else {
    //localStorage.setItem("skip", "false");
    if(!localStorage.getItem('skip') || localStorage.getItem('skip') == 'false') {
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
});
