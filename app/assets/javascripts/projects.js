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

function completeProject(projectForm){
  $.ajax({
    url: $(projectForm).attr('action'),
    method: 'PATCH',
    data: $(projectForm).serialize(),
    dataType: 'json'

  }).done(function(json){

    if (json.complete){
        $(`tr#row-${json.id}`).remove();
        alert("Project marked completed");
    }
  });
}

function displayProject(projectLink){
  let teamId = $(projectLink).data("id");
  let projectsString = '';
  if (projectLink.innerText=="Hide Projects"){
    $("div.projects table").empty();
    projectLink.innerText = "View Projects"
  } else {
    $.get(projectLink.href, function(data) {
      $("div.projects").html(`
        <table class="table table-hover" id="projects_table">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Description</th>
              <th scope="col">Deadline</th>
            </tr>
          </thead>
          <tbody>
          </tbody>
        </table>`);

        for (let projectAttributes of data){
          let project = new Project(projectAttributes);
          projectsString +=project.formatProject();
        }

      $('table#projects_table tbody').html(projectsString);
    }, 'json');
    projectLink.innerText="Hide Projects";
  }
}

$(function(){
  addProjectEventListeners();
});


function addProjectEventListeners(){
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
