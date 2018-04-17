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

  def self.find_by_name(name)
    where(name: name)
  end

  def self.past_due
    where("due_date < ?", DateTime.now)
  end

  def self.due_in(days) #only for due today and tomorrow: refactor?
    days_in_int = days.to_i
    self.all.each.select do |project|
      if days_in_int == 0 || days_in_int == 1
        (project.due_date.to_date - Date.today).to_i == days_in_int
      else
        (project.due_date.to_date - Date.today).to_i < (days_in_int + 1)
      end
    end
  end




end
