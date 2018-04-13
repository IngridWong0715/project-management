class WelcomeController < ApplicationController
  skip_before_action :require_authentication
  def welcome
  end

end
