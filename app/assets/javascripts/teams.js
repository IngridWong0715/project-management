$(function(){

  $("a.view_projects").on('click', function(e){
    alert("CLICKED!")
    var id = $(this).data("id")
    var tbody = $("div.projects tbody")
    $.get( `/teams/${id}/projects`, function( data ) {
debugger;
      data.forEach(function(project){

      })



    });
    e.preventDefault();
  })

})
