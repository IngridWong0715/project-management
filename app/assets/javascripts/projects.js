$(function(){
  if (document.querySelector("#task-partial-template")){
    projectHandlebarsSetup();
  }

// Display project details

    var projectId = $(this).data('id');

    $.get(this.href, function(data){


        }, 'json');





  // Task show page

  $(document.body).on('click', '.task-link', function(e){
    e.preventDefault();
    var source   = document.getElementById("task-show-template").innerHTML;
    var template = Handlebars.compile(source);

    $.get(this.href, function(data){

      var html = template(data)

      $('div.project-all-details-container').html(html);


    }, 'json')
  })// END TASK SHOW PAGE

  // Delete project
  $(document.body).on('click', 'a.delete', function(e){
    debugger;
    this.preventDefault();

    $.ajax({
        method: "DELETE",
        url: this.href,
        data: {id: $(this).data('id')}
      }).done(function(){
        console.log("OBJECT DELETED")

      })

  }) // end delete project

});



function projectHandlebarsSetup(){
  Handlebars.registerPartial('taskPartial', document.getElementById('task-partial-template').innerHTML)
}
