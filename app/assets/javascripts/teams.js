$(function(){

  $("a.view_projects").on('click', function(e){

    var source   = document.getElementById("project-template").innerHTML;
      var template = Handlebars.compile(source);
      var context = {title: "My New Post", body: "This is my first post!"};
      var html    = template(context);



    var teamId = $(this).data("id")
    var tbody = $("div.projects tbody")

    $.get( `/teams/${teamId}/projects`, function( data ) {

      data.forEach(function(project){

        var due_date  = new Date(project.due_date).toString();
        var context = {team_id: teamId, id: project["id"], name: project["name"], description: project["description"], due_date: due_date}
        var html    = template(context);
        tbody.append(html);

      })



    });
    e.preventDefault();
  })

})
