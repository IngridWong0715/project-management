class Project < ApplicationRecord
  belongs_to :user, optional: true
  belongs_to :team, optional: true # for now, a Project EITHER belongs to a user, OR to a team
  has_many :tasks

  validates :name, presence: true
end
