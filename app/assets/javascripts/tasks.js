class Task {
  constructor(attributes){
    this.id = attributes.id;
    this.name = attributes.name;
    this.description = attributes.description;
    this.project_id = attributes.project_id;
    this.due_date = attributes.due_date;
    this.complete = attributes.complete;
  }

  formatRowDisplay(){
    let formatted =
    `<tr id="row-${this.id}">
      <td><a href="http://localhost:3000/projects/${this.project_id}/tasks/${this.id}" data-task="${this.id}" class="task-link">${this.name}</a>
      <td>
        <form class="complete_task" id="edit_task_${this.id}" action="/projects/${this.project_id}/tasks/${this.id}" method="post">
          <input type="hidden" name="_method" value="patch">
          <input type="hidden" name="authenticity_token" value="${$('meta[name="csrf-token"]')[0]['content']}">
            <input value="${this.name}" type="hidden" name="task[name]" id="task_name">
            <input value="${this.description}" type="hidden" name="task[description]" id="task_description">
            <input value="${this.project_id}" type="hidden" name="task[project_id]" id="task_project_id">
            <input value="${this.due_date}" type="hidden" name="task[due_date]" id="task_due_date">
            <input value="true" type="hidden" name="task[complete]" id="task_complete">
            <input type="submit" value="Complete" >
        </form>
      </td>
    </tr>`;
    return formatted;
  }

  formatShowPage(){
    let formatted = `<div class="container">

      <div class="row">
      <a href="http://localhost:3000/projects/${this.project_id}/tasks" class="task-index">Tasks Index Page</a>
         <div class="col formatted_show">
           <h3 class="text-center">${this.name} </h3>
           <a href="#" class="previous-task" data-project="${this.project_id}">Previous Task | </a>
           <a href="#" class="next-task" data-project="${this.project_id}">Next Task</a>

           <div class="row">
             <div class="col-8 col-sm-6 description_box">
                <h4> Description </h4><br>
                ${this.description}
             </div>
            <div class="row">

                Due: ${this.due_date}<br>
                Status: ${this.complete ? 'Complete' : 'In Progress'}<br>
                (Features to add?
                  - Create a checklist<br>
                  - Add attachment <br>)
                <a href="/projects/${this.project_id}/tasks/${this.id}/edit">Edit Task</a><br>
                <a href="/projects/${this.project_id}/tasks/${this.id}">Delete Task Task</a>
             </div>
          </div>
        </div>
      </div>
    </div>`;
    return formatted;
  }
} // END CLASS TASK


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


function createNewTask(taskForm){
  $('input').removeAttr('data-disable-with')
  $.post($(taskForm).attr('action'), $(taskForm).serialize(), function(data){
    let task = new Task(data);

    $('table.tasks_table tbody').append(task.formatRowDisplay());
    //$('#task_name').val('')
    $( '#new_task' ).each(function(){
      this.reset();
    });
    alert("ISSUE 1: RESET NOT WORKING PROPERLY. ISSUE 2: TASK IS ADDED TO THE BEGINNING AND END OF THE LIST")
    // document.getElementById('new_task').reset();
  }, 'json');
}

function loadSurroundingTaskShowPage(position){
  // IS THERE A BETTER WAY TO STORE AND GET PROJECT AND TASK?
  let project = $(this).data('project');
  let task = $('div.task-box').data('task');

  // fetch previoius/next task, depending on the position argument:
    $.get(`http://localhost:3000/projects/${project}/tasks/${task}/${position}`, function(data){
      if (data) {
        $.get(`http://localhost:3000/projects/${project}/tasks/${data}`, function(data){

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
