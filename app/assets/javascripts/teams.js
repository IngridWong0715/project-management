$(function(){
  // ISSUE: code stops working when I refactor this into function addEventListners
  $("a.view_projects").on('click', function(e){
    e.preventDefault();
    displayProject(this);
    });
});

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
      <td><div class="checkbox checkbox-success"><input type="checkbox" id="checkbox1" class="styled"><label></label></div></td>
    </tr>
    `
    return formatted;
  }
}

function displayProject(project){
  let teamId = $(project).data("id");
  let projectsString = '';
  if (project.innerText=="Hide Projects"){
    $("div.projects table").empty();
    project.innerText = "View Projects"
  } else {
    $.get(project.href, function(data) {

      $("div.projects").html(`
        <table class="table table-hover" id="projects_table">
      <thead>
        <tr>
          <th scope="col">Name</th>
          <th scope="col">Description</th>
          <th scope="col">Deadline</th>
          <th scope="col">Complete</th>
        </tr>
      </thead>
      <tbody>
        INSERT EACH PROJECT IN HERE
      </tbody>
      </table>`);

      data.forEach(function(projectAttributes){
        let project = new Project(projectAttributes);
        projectsString +=project.formatProject();
      });
      $('table#projects_table tbody').html(projectsString);
    }, 'json');
    project.innerText="Hide Projects";
  }
}
