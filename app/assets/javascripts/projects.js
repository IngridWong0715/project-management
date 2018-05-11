$(function(){
  if (document.querySelector("#task-partial-template")){
    projectHandlebarsSetup();
  }

  addEventListeners();

});// END OF DOCUMENT READY

function getSurroundingTask(position){
  // IS THERE A BETTER WAY TO GET PROJECT AND TASK?
  var project = $(this).data('project')
  var task = $('div.task-box').data('task')

  // fetch next task
    $.get(`http://localhost:3000/projects/${project}/tasks/${task}/surrounding_tasks`, function(data){

      var previousTask = data[position]
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
        let index = (position == 'previous') ? 'first' : 'last'
        alert(`You're viewing the ${index} task`);
      }

    }, 'json')

}

function addEventListeners(){
  $('form.new_task').on('submit', function(e){
    e.preventDefault();
    createNewTask(this);
  });

  $('div.task-box').on('click', '.task-link', function(e){
    e.preventDefault();
    loadTaskShowPage(this);
  });

  $('div.task-box').on('click', '.next-task', function(e){
    e.preventDefault();
    getSurroundingTask('next')
  });


  $('div.task-box').on('click', '.previous-task', function(e){
    e.preventDefault();
    getSurroundingTask('previous')
  });
}

  function loadTaskShowPage(task){
    $.get(task.href, function(data){

      $('div.task-box').empty();
        var source   = document.getElementById("task-show-template").innerHTML;
        var template = Handlebars.compile(source);
        var html = template(data);
        $('div.task-box').html(html);
    }, 'json');
    // ASK!!!(ideally, want to add these 2 values to the dynamically created next and previous links: but can't because it's ASYNC)
    // so save them to the div.task-box
    $('div.task-box').data('task', $(task).data('task'))

  }

function createNewTask(task){
  $.post($(task).attr('action'), $(task).serialize(), function(data){
    debugger;
    $('table.tasks_table tbody').append(
      ` <td>${data['name']}</td>
        <td>${data['description']}</td>
        <td>${data['due_date']}</td>
      </tr>`);
  }, 'json')
}
function projectHandlebarsSetup(){
  Handlebars.registerPartial('taskPartial', document.getElementById('task-partial-template').innerHTML)
}
