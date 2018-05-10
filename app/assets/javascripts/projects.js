$(function(){
  if (document.querySelector("#task-partial-template")){
    projectHandlebarsSetup();
  }

  // Task show page

  $(document.body).on('click', '.task-link', function(e){
    e.preventDefault();

    $.get(this.href, function(data){

      $('div.task-box').empty();

      debugger;
      $('div.task-box').html(data["name"])


        var source   = document.getElementById("task-show-template").innerHTML;
        var template = Handlebars.compile(source);

        var html = template(data);
        $('div.task-box').html(html);
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
