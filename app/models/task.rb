class Task < ApplicationRecord
  belongs_to :project
  delegate :team, :user, :to => :project, :allow_nil => true #implements the belongs_to, through relationship
  validates :name, presence: true
end
