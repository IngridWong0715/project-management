class Task {
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

  //Task.indexShell = `hi`;

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
                Create a checklist<br>
                Add attachment <br>
                Have a "complete task" button <br>
                <a href="/projects/${this.project_id}/tasks/${this.id}/edit">Edit Task</a><br>
                <a href="/projects/${this.project_id}/tasks/${this.id}">Delete Task Task</a>

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
