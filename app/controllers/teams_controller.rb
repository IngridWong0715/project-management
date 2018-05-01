class TeamsController < ApplicationController
  before_action :set_team, only: [:show, :edit, :update, :destroy]
  def new
    @team = Team.new
    @other_users = User.all_but_current_user(current_user)
  end

  def create
    team = current_user.teams.create(team_params)
    if team.save
      redirect_to team_path(team)
    else
      flash[:warning] = "team not created"
      redirect_to root_path
    end
  end

  def show
  end

  def edit
    @other_users = User.all_but_current_user(current_user)
  end

  def update
    if @team.update(team_params)
      @team.users<<current_user
      redirect_to team_path(@team)
    else
      flash[:notice] = "unable to update team"
      render "teams/form"
    end
  end

  def destroy
    @team.destroy
    redirect_to root_path
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
