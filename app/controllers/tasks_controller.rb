class TasksController < ApplicationController

  before_action :set_task, only: [:show, :edit, :update, :destroy]
   def new #/projects/:project_id/tasks/new(.:format)
     @project = Project.find(params[:project_id])
     @task = @project.tasks.new
   end

  def create
    task = Task.create(task_params)
    redirect_to project_path(task.project)
  end

  def update
    if @task.update(task_params)
      flash[:notice] = "task updated successfully"
      redirect_to project_task_path(@task.project.id, @task.id)
    else
      flash[:notice] = "unable to update task"
      render "tasks/form"
    end
  end

  def search

    if !params[:task][:name].empty?
      @tasks = Task.find_by_name(params[:task][:name])
    elsif params[:task][:data][:due]
      @tasks = Task.due_in(params[:task][:data][:due])
    end

    render 'search'

  end

  private

  def task_params
    params.require(:task).permit(:name, :description, :project_id, :due_date, data: params[:task][:data].try(:keys))
  end

  def set_task
    @task = Task.find(params[:id])
    @project = @task.project
  end
end
