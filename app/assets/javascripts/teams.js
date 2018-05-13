$(function(){
  // ISSUE: code stops working when I refactor this into function addEventListners
  $("a.view_projects").on('click', function(e){
    e.preventDefault();
    displayProject(this);
    });

  $('div.container').on('submit', 'form.complete_project', function(e){
    e.preventDefault();
    completeProject(this);
  });

});



function completeProject(projectForm){
  $.ajax({
    url: $(projectForm).attr('action'),
    method: 'PATCH',
    data: $(projectForm).serialize(),
    dataType: 'json'

  }).done(function(json){
    debugger;
    if (json.complete){
        $(`tr#row-${json.id}`).remove(); //remove task from table
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
      data.forEach(function(projectAttributes){
        let project = new Project(projectAttributes);
        projectsString +=project.formatProject();
      });
      $('table#projects_table tbody').html(projectsString);
    }, 'json');
    projectLink.innerText="Hide Projects";
  }
}
