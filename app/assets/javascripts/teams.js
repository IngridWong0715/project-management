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
        });
        this.innerText="Hide Projects"
      }
    });
    //END OF REFACTORING NEEDED

    // targeting <a class="project-link"> which is dynamically created by the displayProject function
    // ISSUE: “ Event handlers are bound only to the currently selected elements; they must exist on the page at the time your code makes the call to .on().”
    // since .on() is called at document ready, and the <a> tag is added dynamically later. Doesn't work
    $('div.projects').on('click', '.project-link', function(e){
        alert("YOU CLICKED!")
      e.preventDefault();
    })
});

function handlebarsSetup(){
  Handlebars.registerPartial('projectPartial', document.getElementById('project-partial-template').innerHTML)
}
