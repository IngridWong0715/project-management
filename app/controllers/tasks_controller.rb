class TasksController < ApplicationController

  before_action :set_task, only: [:show, :edit, :update, :destroy, :next, :previous, :complete_task]
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

  def create
    task = Task.create(task_params)
    render json: task
  end

  def edit
    @project = @task.project
  end

  def update
    if @task.update(task_params)
      respond_to do |f|
        f.html {redirect_to project_task_path(@task.project.id, @task.id)}
        f.json {render json: @task}
      end
    else
      respond_to do |f|
        f.html {
          flash[:notice] = "unable to update task"
          render "tasks/form"
        }
        f.json {render json: @task}
      end

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

  def next
    next_task = @task.get_next_task_id
    render json: next_task

  end

  def previous
    previous_task = @task.get_previous_task_id
    render json: previous_task
  end

  private

  def task_params
    params.require(:task).permit(:name, :description, :project_id, :due_date, :complete, data: params[:task][:data].try(:keys))
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
