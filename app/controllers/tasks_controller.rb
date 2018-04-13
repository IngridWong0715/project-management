class TasksController < ApplicationController
  def create
    task = Task.create(task_params)
    redirect_to project_path(task.project) #CHANGE!!!
  end

  def index
  end


  private

  def task_params
    params.require(:task).permit(:name, :description, :project_id)
  end
end
