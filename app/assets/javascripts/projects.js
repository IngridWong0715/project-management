$(function(){
  addEventListeners();

});


function completeTask(taskForm){
  $.ajax({
    url: $(taskForm).attr('action'),
    method: 'PATCH',
    data: $(taskForm).serialize(),
    dataType: 'json'
  }).done(function(json){
    if (json.complete){
        $(`tr#row-${json.id}`).remove(); //remove task from table
        alert("Task marked completed")
    }

  })
}

class Project {
  constructor(attributes){
    this.id = attributes.id;
    this.name = attributes.name;
    this.description = attributes.description;
    this.team_id = attributes.team_id;
    this.user_id = attributes.user_id;
    this.due_date = attributes.due_date;
    this.complete = attributes.complete
  }

  formatProject(){
    let formatted =
    `<tr>
      <td><a href="/teams/${this.team_id}/projects/${this.id}">${this.name}</a></td>
      <td>${this.description}</td>
      <td>${this.due_date}</td>
    </tr>
    `
    return formatted;
  }
}


function createNewTask(taskForm){
  $.post($(taskForm).attr('action'), $(taskForm).serialize(), function(data){
    let task = new Task(data);
    task.set_surrounding_tasks();
    $('table.tasks_table tbody').append(task.formatDisplay());
    document.getElementById('new_task').reset()
  }, 'json');
}

function loadSurroundingTaskShowPage(position){
  // IS THERE A BETTER WAY TO STORE AND GET PROJECT AND TASK?
  let project = $(this).data('project');
  let task = $('div.task-box').data('task');

  // fetch previoius/next task, depending on the position argument
    $.get(`http://localhost:3000/projects/${project}/tasks/${task}/surrounding_tasks`, function(data){
      let searchedTask = data[position]
      if (searchedTask) {
        $.get(`http://localhost:3000/projects/${project}/tasks/${searchedTask}`, function(data){
          let task = new Task(data);
          $('div.task-box').html(task.formatShow());

          // newReferenceTask is the current task, that is then passed into task-box
          //to reference for next cycle of loadSurroundingTaskShowPage() invokation:
          let taskId = this.url.split('/')
          let newReferenceTask = taskId[taskId.length-1]
          $('div.task-box').data('task', newReferenceTask);
        },'json')
      } else {
        let index = (position == 'previous') ? 'first' : 'last';
        alert(`You're viewing the ${index} task`);
      }
    }, 'json');
}

function loadTaskShowPage(taskLink){
  $.get(taskLink.href, function(data){
    let task = new Task(data);
    $('div.task-box').html(task.formatShow());
  }, 'json');
  // ASK!!!(ideally, want to add the dynamically created next and previous links: but can't because it's ASYNC)
  // so save a data-task = current_task.id to the div.task-box for future reference
  $('div.task-box').data('task', $(taskLink).data('task'));
}

function addEventListeners(){
  $('form#new_task').on('submit', function(e){
    e.preventDefault();
    createNewTask(this);
  });

  $('div.task-box').on('click', '.task-link', function(e){
    e.preventDefault();
    loadTaskShowPage(this);
  });

  $('div.task-box').on('click', '.next-task', function(e){
    e.preventDefault();
    loadSurroundingTaskShowPage('next')
  });

  $('div.task-box').on('click', '.previous-task', function(e){
    e.preventDefault();
    loadSurroundingTaskShowPage('previous')
  });

  $('div.task-box').on('submit','form.complete_task',function(e){
    e.preventDefault();
    completeTask(this);
  });
}
