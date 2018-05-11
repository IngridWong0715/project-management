$(function(){
  if (document.querySelector("#task-partial-template")){
    projectHandlebarsSetup();
  }

  // Task show page when clicked on each task name in the table
  $('div.task-box').on('click', '.task-link', function(e){
    e.preventDefault();
    $.get(this.href, function(data){

      $('div.task-box').empty();
        var source   = document.getElementById("task-show-template").innerHTML;
        var template = Handlebars.compile(source);
        var html = template(data);
        $('div.task-box').html(html);
    }, 'json');
    // ASK!!!(ideally, want to add these 2 values to the dynamically created next and previous links: but can't because it's ASYNC)
    // so save them to the div.task-box
    $('div.task-box').data('task', $(this).data('task'))

  })// END TASK SHOW PAGE

  // Get and render the next task in a show page
  $('div.task-box').on('click', '.next-task', function(e){
    e.preventDefault();

    // IS THERE A BETTER WAY TO GET PROJECT AND TASK?
    var project = $(this).data('project')
    var task = $('div.task-box').data('task')

    // fetch next task
      $.get(`http://localhost:3000/projects/${project}/tasks/${task}/surrounding_tasks`, function(data){

        var nextTask = data['next']
        $.get(`http://localhost:3000/projects/${project}/tasks/${nextTask}`, function(data){
          //repeated code!!!
          $('div.task-box').empty();
            var source   = document.getElementById("task-show-template").innerHTML;
            var template = Handlebars.compile(source);
            var html = template(data);
            $('div.task-box').html(html);
            //end of repeated code

            var nextTask = this.url.slice(-1)
            $('div.task-box').data('task', nextTask)

        },'json')
      }, 'json')


  })

  // Delete project
  $(document.body).on('click', 'a.delete', function(e){

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
