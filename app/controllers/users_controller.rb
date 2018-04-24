class UsersController < ApplicationController

  def show

    @individual_projects = Project.active_individual_projects(current_user)
    @group_projects = Project.active_group_projects(current_user)
    @past_due_projects = Project.all_past_due_projects(current_user);


  end

  def profile

  end

end
