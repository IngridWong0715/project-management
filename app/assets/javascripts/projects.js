$(function(){
  if (document.querySelector("#task-partial-template")){
    projectHandlebarsSetup();
  }
  $("a.view-tasks").on('click', function(e){

    e.preventDefault();
    var projectId = $(this).data('id');

      if (this.innerText=='Hide Tasks') {
        $('div.tasks table').empty();
        this.innerText = 'View Tasks'
      } else {
        $.get(this.href, function(data){
          var source   = document.getElementById("tasks-table-template").innerHTML;
          var template = Handlebars.compile(source);
          var html = template(data);
          $('div.tasks').append(html);

        });
        this.innerText = "Hide Tasks"

      }


  });

  $('div.tasks').on('click', '.task-link', function(e){
    e.preventDefault();
    $.get(this.href, function(data){
      $('div.project-all-details-container').html(data['name'])

    }, 'json')
  })
});




function projectHandlebarsSetup(){
  Handlebars.registerPartial('taskPartial', document.getElementById('task-partial-template').innerHTML)
}
