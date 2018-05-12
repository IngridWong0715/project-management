$(function(){
  addEventListeners();
});

class Task{
  constructor(attributes){
    this.id = attributes.id;
    this.name = attributes.name;
    this.description = attributes.description;
    this.project_id = attributes.project_id;
    this.due_date = attributes.due_date;
    this.complete = attributes.complete;
    this._next = 0; //defaulting to 0 first... fix later
    this._previous = 0;//defaulting to 0 first
    //this.set_surrounding_tasks();
  }

  formatDisplay(){
    let formatted =
    `<tr>
      <td><a href="http://localhost:3000/projects/${this.project_id}/tasks/${this.id}" data-task="${this.id}" class="task-link">${this.name}</a>
      <td>${this.description}</td>
      <td>${this.due_date}</td>
      <td><div class="checkbox checkbox-success"><input type="checkbox" id="checkbox1" class="styled"><label></label></div></td>
    </tr>`;
    return formatted;
  }

  formatShow(){
    let formatted = `<div class="container">
      <div class="row">
         <div class="col formatted_show">
           <h3 class="text-center">${this.name} </h3>
           <a href="#" class="previous-task" data-project="${this.project_id}">Previous Task | </a>
           <a href="#" class="next-task" data-project="${this.project_id}">Next Task</a>

           <div class="row">
             <div class="col-8 col-sm-6 description_box">
               ${this.description}
             </div>
             <div class="col-8 col-sm-6">
                Due: ${this.due_date}<br>
                Create a checklist<br>
                Add attachment <br>
                Have a "complete task" button <br>
                <div class="right_bottom_link">
                  <a href="/projects/${this.project_id}/tasks/${this.id}/edit">Edit Task</a>
                  <a href="/projects/${this.project_id}/tasks/${this.id}">Delete Task Task</a>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>`;
    return formatted;
  }

  //CODE NOT WORKING:
  set next(newNext){
    this._next = newNext; // look into this _ convention:
  }

  set previous(newPrevious){
    this._previous = newPrevious;
  }

  set_surrounding_tasks(){//SETS TASK.PREVIOUS_TASK_ID & TAKS.NEXT_TASK_ID
    var task = this;
    $.get(`http://localhost:3000/projects/${this.project_id}/tasks/${this.id}/surrounding_tasks`, function(data){
      task.next = data['next']
      task.previous = data['previous']
    });
  }
  //NOT WORKING

} // END CLASS TASK

function createNewTask(task){
  $.post($(task).attr('action'), $(task).serialize(), function(data){
    let task = new Task(data);
    task.set_surrounding_tasks();
    $('table.tasks_table tbody').append(task.formatDisplay());
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
    loadSurroundingTaskShowPage('next')
  });

  $('div.task-box').on('click', '.previous-task', function(e){
    e.preventDefault();
    loadSurroundingTaskShowPage('previous')
  });
}
