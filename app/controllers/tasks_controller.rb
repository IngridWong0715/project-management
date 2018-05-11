class TasksController < ApplicationController

  before_action :set_task, only: [:show, :edit, :update, :destroy, :surrounding]
    def index
      if params[:project_id]
        project = Project.find(params[:project_id])
        tasks = project.tasks
      else
        tasks = Task.all
      end
      render json: tasks
    end

    def show
      respond_to do |format|
        format.html {render 'show'}
        format.json {render json: @task }
      end
    end

   def new
     @project = Project.find(params[:project_id])
     @task = @project.tasks.new
   end

  def create
    task = Task.create(task_params)
    redirect_to project_path(task.project)
  end

  def edit
    @project = @task.project
  end

  def update
    if @task.update(task_params)
      redirect_to project_task_path(@task.project.id, @task.id)
    else
      flash[:notice] = "unable to update task"
      render "tasks/form"
    end
  end

  def destroy
    @task.destroy
    redirect_to project_path(@task.project.id)
  end

  def search
    if !params[:task][:name].empty?
      @tasks = Task.find_by_name(current_user, params[:task][:name])
    elsif params[:task][:data][:due]
      @tasks = Task.due_in(current_user, params[:task][:data][:due])
    end

    render 'search'

  end

  def surrounding
    surrounding_tasks = @task.get_previous_and_next_task_ids
    render json: surrounding_tasks
  end

  private

  def task_params
    params.require(:task).permit(:name, :description, :project_id, :due_date, data: params[:task][:data].try(:keys))
  end

  def set_task
    @task = Task.find(params[:id])

    if @task.user == current_user || current_user.teams.include?(@task.team)
      @task
    else
      flash[:warning] = "You can only access task that belong to you and your teams"
      redirect_to root_path
    end
  end
end
