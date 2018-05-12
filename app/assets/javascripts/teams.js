$(function(){
  if (document.querySelector("#project-partial-template")){
    handlebarsSetup();
  }

  // ISSUE: code stops working when I refactor this into function addEventListners
  $("a.view_projects").on('click', function(e){
    e.preventDefault();
    displayProject(this);
    });

});

function displayProject(project){

    let teamId = $(project).data("id");
    if (project.innerText=="Hide Projects"){
      $("div.projects table").empty();
      project.innerText = "View Projects"
    } else {
      $.get(project.href, function(data) {
        let source   = document.getElementById("projects-table-template").innerHTML;
        let template = Handlebars.compile(source);
        let html = template(data);
        
        $("div.projects").append(html);
      }, 'json');
      project.innerText="Hide Projects"
    }

}

function handlebarsSetup(){
  Handlebars.registerPartial('projectPartial', document.getElementById('project-partial-template').innerHTML)
}
