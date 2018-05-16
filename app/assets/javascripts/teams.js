$(function(){
  addTeamEventListeners();
});

function addTeamEventListeners(){
  $("a.view_projects").on('click', function(e){
    e.preventDefault();
    displayProject(this);
    });

  $('div.container').on('submit', 'form.complete_project', function(e){
    e.preventDefault();
    completeProject(this);
  });
}
