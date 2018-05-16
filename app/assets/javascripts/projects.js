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

    $('table.tasks_table tbody').append(task.formatRowDisplay());
    $( '#new_task' ).each(function(){
      this.reset();
    });
    alert("ISSUE 1: RESET NOT WORKING PROPERLY. ISSUE 2: TASK IS ADDED TO THE BEGINNING AND END OF THE LIST")
    // document.getElementById('new_task').reset();
  }, 'json');
}

//SEPERATE INTO NEXT & PREVIOUS???
function loadSurroundingTaskShowPage(position){
  // IS THERE A BETTER WAY TO STORE AND GET PROJECT AND TASK?
  let project = $(this).data('project');
  let task = $('div.task-box').data('task');

  // fetch previoius/next task, depending on the position argument:
    $.get(`http://localhost:3000/projects/${project}/tasks/${task}/surrounding_tasks`, function(data){
      let searchedTask = data[position]
      if (searchedTask) {
        $.get(`http://localhost:3000/projects/${project}/tasks/${searchedTask}`, function(data){
          let task = new Task(data);
          $('div.task-box').html(task.formatShowPage());

          //pass the id into task-box
          //to reference for next cycle of loadSurroundingTaskShowPage() invokation:
          $('div.task-box').data('task', task.id);
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
    $('div.task-box').html(task.formatShowPage());
  }, 'json');
  // ASK!!!(ideally, want to add the dynamically created next and previous links: but can't because it's ASYNC)
  // so save a data-task = current_task.id to the div.task-box for future reference
  $('div.task-box').data('task', $(taskLink).data('task'));
}

function loadTasksIndexPage(projectLink){
  $.get(projectLink.href, function(data){
  
    let taskIndexFormat = `
      <table class="table table-hover tasks_table">
        <tr>
          GET THE NEW TASK FORM
        </tr>
      <tbody>
    `

    for (let taskDetails of data){
      let task = new Task(taskDetails);
      taskIndexFormat += task.formatRowDisplay();
    }

    taskIndexFormat += `
       </tbody>
     </table>`;

     $('div.task-box').html(taskIndexFormat);

  })
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

  $('div.task-box').on('click', '.task-index', function(e){
    e.preventDefault();
    loadTasksIndexPage(this);
  })
}
