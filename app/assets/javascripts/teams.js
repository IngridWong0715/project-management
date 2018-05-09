$(function(){

  $("a.view_projects").on('click', function(e){

    var source   = document.getElementById("project-template").innerHTML;
      var template = Handlebars.compile(source);
      var context = {title: "My New Post", body: "This is my first post!"};
      var html    = template(context);



    var id = $(this).data("id")
    var tbody = $("div.projects tbody")

    $.get( `/teams/${id}/projects`, function( data ) {

      data.forEach(function(project){
        var context = {name: project["name"], description: project["description"]}
        var html    = template(context);
        tbody.append(html);

      })



    });
    e.preventDefault();
  })

})
