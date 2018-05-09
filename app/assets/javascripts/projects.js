//Once the following is added, team#show AJAX projects index stops working

$(function(){
  handlebarsSetup();
  $("a.view-tasks").on('click', function(e){

    e.preventDefault();
    alert("you hit link!")
  });
});

function handlebarsSetup(){
  Handlebars.registerPartial('taskPartial', document.getElementById('task-partial-template').innerHTML)
}
