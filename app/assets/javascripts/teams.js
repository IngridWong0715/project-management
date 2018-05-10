$(function(){
  if (document.querySelector("#project-partial-template")){
    handlebarsSetup();
  }

  // Refactor into a displayProject function
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
        }, 'json');
        this.innerText="Hide Projects"
      }
    });
    //END OF REFACTORING NEEDED

});

function handlebarsSetup(){
  Handlebars.registerPartial('projectPartial', document.getElementById('project-partial-template').innerHTML)
}
