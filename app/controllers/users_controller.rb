class UsersController < ApplicationController

  def show
    @user = current_user
    @projects = @user.projects # REFACTOR THIS PATTERN?
    @tasks = @user.tasks

  end

end
