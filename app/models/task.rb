class Task < ApplicationRecord
  belongs_to :project
  delegate :team, :user, :to => :project, :allow_nil => true #implements the belongs_to, through relationship
  validates :name, presence: true

    def self.find_by_name(name)
      where(name: name)
    end

    def self.past_due
      where("due_date < ?", DateTime.now)
    end

    def self.due_in(days) #only for due today and tomorrow: refactor?
      days_in_int = days.to_i
      self.all.each.select do |task|
        if days_in_int == 0 || days_in_int == 1
          (task.due_date.to_date - Date.today).to_i == days_in_int
        else
          (task.due_date.to_date - Date.today).to_i < (days_in_int + 1)
        end
      end
    end

end
