class User < ApplicationRecord
    has_and_belongs_to_many :teams
    has_many :projects
    has_many :tasks, through: :projects

    has_secure_password
    validates :name, presence: true
    validates :email, presence: true
end
