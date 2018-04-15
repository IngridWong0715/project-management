class TeamsController < ApplicationController
  before_action :set_team, only: [:show, :edit, :update]
  def new
    @team = Team.new
  end

  def create
    team = Team.create(team_params)
    redirect_to team_path(team.id)
  end

  def show
  end

  private

  def set_team
    @team = Team.find(params[:id])
  end

  def team_params
    params.require(:team).permit(:name, :function, :description, user_ids: [])
  end
end
