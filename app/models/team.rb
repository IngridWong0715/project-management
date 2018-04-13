class Team < ApplicationRecord
  has_and_belongs_to_many :users
  has_many :projects
  has_many :tasks, through: :projects

  validates :name, presence: true
end
