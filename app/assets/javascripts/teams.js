$(function(){
  // ISSUE: code stops working when I refactor this into function addEventListners
  $("a.view_projects").on('click', function(e){
    e.preventDefault();
    displayProject(this);
    });
});


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
            </tr>
          </thead>
          <tbody>
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
