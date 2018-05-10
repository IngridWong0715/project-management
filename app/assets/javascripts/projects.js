$(function(){
  if (document.querySelector("#task-partial-template")){
    projectHandlebarsSetup();
  }
  $("a.view-project-link").on('click', function(e){

    e.preventDefault();
    var projectId = $(this).data('id');


        $.get(this.href, function(data){

          var source   = document.getElementById("project-template").innerHTML;
          var template = Handlebars.compile(source);
          var html = template(data);
          debugger;

          $(document.body).append(html);
        }, 'json');



  });

  $(document.body).on('click', '.task-link', function(e){
    e.preventDefault();
    var source   = document.getElementById("task-show-template").innerHTML;
    var template = Handlebars.compile(source);
    debugger;
    $.get(this.href, function(data){

      var html = template(data)

      $('div.project-all-details-container').html(html);


    }, 'json')
  })
});

function projectHandlebarsSetup(){
  Handlebars.registerPartial('taskPartial', document.getElementById('task-partial-template').innerHTML)
}
