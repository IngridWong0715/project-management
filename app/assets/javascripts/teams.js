$(function(){
  if (document.querySelector("#project-partial-template")){
    handlebarsSetup();
  }

  $("a.view_projects").on('click', function(e){
      e.preventDefault();

      var teamId = $(this).data("id");

      if (this.innerText=="Hide Projects"){

        $("div.projects table").empty();
        this.innerText = "View Projects"
      } else {

        $.get(this.href, function(data) {

          var source   = document.getElementById("projects-table-template").innerHTML;
          var template = Handlebars.compile(source);

          var html = template(data);
          $("div.projects").append(html);
        });
        this.innerText="Hide Projects"

      }
    });
})

function handlebarsSetup(){
  Handlebars.registerPartial('projectPartial', document.getElementById('project-partial-template').innerHTML)
}
