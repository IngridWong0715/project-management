class SessionsController < ApplicationController
  skip_before_action :require_authentication, only: [:new, :create]

  def new
    #@user = User.new
  end

  def create
    user = User.find_by(email: params[:user][:email])
    if user && user.authenticate(params[:user][:password])
      session[:user_id] = user.id
      redirect_to home_path
    else
      render 'new'
    end
  end

  def destroy
    session.delete :user_id
    redirect_to root_path
  end

end
