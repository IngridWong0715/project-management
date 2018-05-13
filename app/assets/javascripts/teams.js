$(function(){
  // ISSUE: code stops working when I refactor this into function addEventListners
  $("a.view_projects").on('click', function(e){
    e.preventDefault();
    displayProject(this);
    });
});


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
      data.forEach(function(projectAttributes){
        let project = new Project(projectAttributes);
        projectsString +=project.formatProject();
      });
      $('table#projects_table tbody').html(projectsString);
    }, 'json');
    projectLink.innerText="Hide Projects";
  }
}
