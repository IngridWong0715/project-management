$(function(){
  if (document.querySelector("#task-partial-template")){
    projectHandlebarsSetup();
  }

  // FUNCTION//Task show page when clicked on each task name in the table
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

  })// FUNCTION

  // FUNCTION//Get and render the next task in a show page
  $('div.task-box').on('click', '.next-task', function(e){
    e.preventDefault();

    // IS THERE A BETTER WAY TO GET PROJECT AND TASK?
    var project = $(this).data('project')
    var task = $('div.task-box').data('task')

    // fetch next task
      $.get(`http://localhost:3000/projects/${project}/tasks/${task}/surrounding_tasks`, function(data){

        var nextTask = data['next']
        if (nextTask) { //if the current task is not the last task
          $.get(`http://localhost:3000/projects/${project}/tasks/${nextTask}`, function(data){
            //repeated code!!!
            $('div.task-box').empty();
              var source   = document.getElementById("task-show-template").innerHTML;
              var template = Handlebars.compile(source);
              var html = template(data);
              $('div.task-box').html(html);
              //end of repeated code

              // newReferenceTask is the current task, that is then passed into task-box
              //to reference for next cycle of previous/next request
              var taskId = this.url.split('/')
              var newReferenceTask = taskId[taskId.length-1]
              $('div.task-box').data('task', newReferenceTask)

          },'json')

        } else {
          alert("You're viewing the last task");
        }

      }, 'json')
  });//FUNCTION


  // FUNCTION//Get and render the previous task in a show page
  $('div.task-box').on('click', '.previous-task', function(e){
    e.preventDefault();

    // IS THERE A BETTER WAY TO GET PROJECT AND TASK?
    var project = $(this).data('project')
    var task = $('div.task-box').data('task')

    // fetch next task
      $.get(`http://localhost:3000/projects/${project}/tasks/${task}/surrounding_tasks`, function(data){

        var previousTask = data['previous']
        if (previousTask) {
          $.get(`http://localhost:3000/projects/${project}/tasks/${previousTask}`, function(data){
            //repeated code!!!
            $('div.task-box').empty();
              var source   = document.getElementById("task-show-template").innerHTML;
              var template = Handlebars.compile(source);
              var html = template(data);
              $('div.task-box').html(html);
              //end of repeated code

              // newReferenceTask is the current task, that is then passed into task-box
              //to reference for next cycle of previous/next request
              var taskId = this.url.split('/')
              var newReferenceTask = taskId[taskId.length-1]

              $('div.task-box').data('task', newReferenceTask)

          },'json')

        } else {
          alert("You're viewing the first task");
        }

      }, 'json')
  });//FUNCTION

});// END OF DOCUMENT READY


function projectHandlebarsSetup(){
  Handlebars.registerPartial('taskPartial', document.getElementById('task-partial-template').innerHTML)
}
