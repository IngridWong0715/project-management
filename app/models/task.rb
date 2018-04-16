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

    def self.due_today
      self.due_in(0)
    end

    def self.due_tomorrow
      self.due_in(1)
    end

    def self.due_within_one_week
      self.due_within(7)
    end
    def self.due_within_two_weeks
      self.due_within(14)
    end

    def self.due_within_one_month
      self.due_within(31)
    end

    def self.due_in(days) #only for due today and tomorrow: refactor?
      self.all.each.select do |task|
        (task.due_date.to_date - Date.today).to_i == days.to_i
      end
    end

    def self.due_within(days)
      self.all.each.select do |task|
        (task.due_date.to_date - Date.today).to_i < (days.to_i + 1)
      end
    end

end
