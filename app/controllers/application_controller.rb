class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  before_action :require_authentication

  private

  def current_user
    @current_user ||= User.find(session[:user_id]) if session[:user_id]
  end

  def logged_in?
    !!current_user
  end

  def require_authentication
    if !logged_in?
      redirect_to root_path
    end
  end

  helper_method :current_user
end
