class UsersController < ApplicationController
  skip_before_action :require_authentication, only: [:new, :create]

  def new
    @user = User.new
  end

  def create
    if !User.find_by(email: params[:user][:email])
      user = User.create(user_params)
      session[:user_id] = user.id
      redirect_to home_path
    else
      flash[:warning] = "User already exists, please sign in instead"
      redirect_to root_path
    end
  end

  def show
    @user = current_user
    @projects = @user.projects # REFACTOR THIS PATTERN?
  end

  private

  def user_params
    params.require(:user).permit(:name, :email, :password, :password_confirmation)
  end
end
