$(function(){
  handlebarsSetup();
  $("a.view_projects").on('click', function(e){
      e.preventDefault();

      var teamId = $(this).data("id")

      if (this.innerText=="Hide Projects"){

        $("div.projects table").empty();
        this.innerText = "View Projects"
      } else {

        $.get(this.href, function(data) {

          var projectsContext = []
          data.forEach(function(project){
            projectsContext.push({team_id: teamId, id: project["id"], name: project["name"], description: project["description"]})
          });

          var source   = document.getElementById("projects-table-template").innerHTML;
          var template = Handlebars.compile(source);

          var html = template(projectsContext);
          $("div.projects").append(html);
        });
        this.innerText="Hide Projects"

      } // end else
    });
})

function handlebarsSetup(){
  Handlebars.registerPartial('projectPartial', document.getElementById('project-template-partial').innerHTML)
}
