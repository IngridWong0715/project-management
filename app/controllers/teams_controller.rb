class TeamsController < ApplicationController
  before_action :set_team, only: [:show, :edit, :update]
  def new
    @team = Team.new
  end

  def create
    team = Team.new(team_params)
    if team.save
      redirect_to team_path(team)
    else
      flash[:warning] = "team not created"
      redirect_to root_path
    end
  end

  def show
  end

  private

  def set_team
    @team = Team.find(params[:id])
    if @team.users.include?(current_user)
      @team
    else
      flash[:warning] = "You can only access information on teams that you belong to."
      redirect_to root_path
    end
  end

  def team_params
    params.require(:team).permit(:name, :function, :description, user_ids: [])
  end
end
