class Project < ApplicationRecord
  belongs_to :user, optional: true
  belongs_to :team, optional: true # for now, a Project EITHER belongs to a user, OR to a team
  has_many :tasks

  validates :name, presence: true


  def self.individual_projects(user) # NECESSARY? IT"S THE SAME AS CALLING CURRENT_USER.PROJECTS
    where(user_id: user, team_id: nil)
  end

  def self.group_projects(user)
    user.teams.collect do |team|
      team.projects
    end.flatten # WHY DOES COLLECT RETURN A NESTED ARRAY? -> one inner array per team
  end

  def self.all_user_projects(user)
    individual_projects(user) + group_projects(user)
  end

  def self.find_by_name(user, name)
    all_user_projects(user).select do |project|
      project.name == name
    end
  end

  def self.past_due(user)

    all_user_projects(user).select do |project|
      project.due_date < DateTime.now
    end
  end

  def self.due_in(user, days) #only for due today and tomorrow: refactor?
    days_in_int = days.to_i
    all_user_projects(user).select do |project|
      dates_diff = (project.due_date.to_date - Date.today).to_i
      if days_in_int == 0 || days_in_int == 1
        dates_diff  == days_in_int
      else
        dates_diff < (days_in_int + 1) && dates_diff  > -1
      end
    end
  end




end
