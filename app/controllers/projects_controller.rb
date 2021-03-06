class ProjectsController < ApplicationController
  before_action :set_project, only: [:show, :edit, :update, :destroy]

  def index
    if params[:team_id]
      @team = Team.find(params[:team_id])
      @projects = @team.projects
    else
      @projects = Project.all_individual_projects(current_user.id)
    end
    respond_to do |f|
      f.html {render 'index'}
      f.json {render json: @projects}
    end
  end

  def new
    @project = Project.new
    if params[:team_id]
      @team = Team.find(params[:team_id])
      @team.projects << @project
    end
  end

  def create

      project = current_user.projects.create(project_params)

      if project.save
        if project.team
          redirect_to team_project_path(project.team, project)
        else
        
          redirect_to project_path(project)
        end
      else
        flash[:warning] = "project not created"
        redirect_to root_path
      end

  end

  def show


    respond_to do |f|
      f.html {render 'show'}
      f.json {render json: @project}
    end
  end

  def edit
  end

  def update
      if @project.update(project_params)
        respond_to do |f|
          f.html {redirect_to project_path(@project.id)}
          f.json {render json: @project}
        end


      else
        respond_to do |f|
          f.html {
            flash[:notice] = "project not edited"
            redirect_to edit_project_path(@project.id)
          }
          f.json {render json: @project}
        end

      end
  end

  def destroy

    @project.destroy

    redirect_to root_path
  end

  def search
    if !params[:project][:name].empty?
      @projects = Project.find_by_name(current_user, params[:project][:name])
    elsif params[:project][:data][:due]
      @projects = Project.due_in(current_user, params[:project][:data][:due])
    end
    render 'search'
  end

  private

  def project_params
    params.require(:project).permit(
      :name, :description, :team_id, :user_id, :due_date, :complete,
      data: params[:project][:data].try(:keys)
    )
  end

  def set_project
    @project = Project.find(params[:id])
    if @project.user == current_user || current_user.teams.include?(@project.team)
      @project
    else
      flash[:warning] = "You can only access projects that belong to you and your teams"
      redirect_to root_path
    end
  end
end
