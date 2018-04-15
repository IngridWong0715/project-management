class TasksController < ApplicationController
   def new #/projects/:project_id/tasks/new(.:format)
     @project = Project.find(params[:project_id])
     @task = @project.tasks.new
   end

  def create
    binding.pry
    task = Task.create(task_params)
    redirect_to project_path(task.project)
  end

  def index
  end


  private

  def task_params
    params.require(:task).permit(:name, :description, :project_id)
  end
end
