class Task < ApplicationRecord
  belongs_to :project
  delegate :team, :user, :to => :project, :allow_nil => true #implements the belongs_to, through relationship
  validates :name, :due_date, presence: true

  def get_previous_and_next_task_ids
    project_tasks = self.project.tasks
    task_index = project_tasks.index(self)
    previous_project = task_index > 0 ? project_tasks[task_index - 1].id : nil
    next_project = task_index < (project_tasks.length - 1) ? project_tasks[task_index + 1].id : nil

    {previous: previous_project, next: next_project}
  end

    def self.individual_tasks(user)
      user.tasks
      # SELECT  "tasks".* FROM "tasks" INNER JOIN "projects" ON "tasks"."project_id" = "projects"."id" WHERE "projects"."user_id" = ? LIMIT ?  [["user_id", 1], ["LIMIT", 11]]
    end

    def self.group_tasks(user)
      user.teams.collect do |team|
        team.tasks
      end.flatten
    end

    def self.all_user_tasks(user)
      individual_tasks(user) + group_tasks(user)
    end

    def self.find_by_name(user, name)
      all_user_tasks(user).select do |task|
        task.name == name
      end
    end

    def self.past_due(user)

      all_user_tasks(user).select do |task|
        task.due_date < DateTime.now
      end
    end

    def self.due_in(user, days)
      days_in_int = days.to_i

      all_user_tasks(user).select do |task|

        dates_diff = (task.due_date.to_date - Date.today).to_i
        if days_in_int == 0 || days_in_int == 1
          dates_diff  == days_in_int
        else
          dates_diff < (days_in_int + 1) && dates_diff  > -1
        end
      end
    end


end
