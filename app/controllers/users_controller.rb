class UsersController < ApplicationController
  

  def show
    @user = current_user
    @projects = @user.projects # REFACTOR THIS PATTERN?
  end

  private

  def user_params
    params.require(:user).permit(:name, :email, :password, :password_confirmation)
  end
end
