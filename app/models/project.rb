class Project < ApplicationRecord
  belongs_to :user, optional: true
  belongs_to :team, optional: true # for now, a Project EITHER belongs to a user, OR to a team
  has_many :tasks


  validates :name, :due_date, presence: true

  scope :all_individual_projects, ->(user_id) { where("user_id = ?", user_id) }

  def self.all_individual_projects(user) # NECESSARY? IT"S THE SAME AS CALLING CURRENT_USER.PROJECTS
    where(user_id: user, team_id: nil)
  end

  def self.all_group_projects(user)
    user.teams.collect do |team|
      team.projects
    end.flatten # WHY DOES COLLECT RETURN A NESTED ARRAY? -> one inner array per team
  end

  def self.all_user_projects(user)
    all_individual_projects(user) + all_group_projects(user)
  end


  def self.all_active_projects(user) #NOT REALLY USING IT!
    all_user_projects(user).select do |project|
      project.due_date >= DateTime.now
    end
  end

  def self.active_individual_projects(user)
    all_individual_projects(user).select do |project|
      project.due_date >= DateTime.now
    end
  end

  def self.active_group_projects(user)
    all_group_projects(user).select do |project|
      project.due_date >= DateTime.now
    end
  end


  def self.all_past_due_projects(user)
    all_user_projects(user).select do |project|
      project.due_date < DateTime.now
    end
  end


  def self.find_by_name(user, name)
    all_user_projects(user).select do |project|
      project.name == name
    end
  end


  def self.due_in(user, days)
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
