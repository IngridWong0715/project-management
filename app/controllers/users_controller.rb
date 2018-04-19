class UsersController < ApplicationController

  def show

    @individual_projects = Project.individual_projects(current_user)
    @group_projects = Project.group_projects(current_user)

  
  end

  def profile

  end

end
