# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...


FOR USER.RB

has_and_belongs_to_many :teams
has_many :projects
has_many :tasks, through: :projects

has_secure_password
validates :name, presence: true
validates :email, presence: true
