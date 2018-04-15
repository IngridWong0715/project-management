class ProjectsController < ApplicationController
  before_action :set_project, only: [:show, :edit, :update, :destroy]

  def index
    @projects = current_user.projects
  end

  def new
    @project = Project.new
  end

  def create
    project = current_user.projects.create(project_params)
    if project.save
      flash[:notice] = "project created successfully"
      redirect_to project_path(project)
    else
      flash[:warning] = "project not created"
      redirect_to root_path
    end
  end

  def show
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
