class ProjectsController < ApplicationController
  before_action :set_project, only: [:edit, :update, :destroy]

  def index
    @projects = current_user.projects
  end

  def new
    @project = Project.new
  end

  def show
    @project = Project.find(params[:id])
    @task = @project.tasks.new
  end

  def create
    if current_user.projects.create(project_params).valid?
      flash[:notice] = "project created successfully"
    else
      flash[:warning] = "project not created"
    end
    redirect_to projects_path

  end

  def edit
  end

  def update
    @project.update(project_params).valid?
    redirect_to projects_path
  end

  def destroy
    @project.destroy
    redirect_to projects_path
  end

  private

  def project_params
    params.require(:project).permit(:name, :description, :team_id, :user_id)
  end

  def set_project
    @project = Project.find(params[:id])
  end
end
