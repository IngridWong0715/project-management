# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


ingrid = User.create(name:"Ingrid", email: "ingrid830715@gmail.com", password: "ingridWONG830715")
victoria = User.create(name: "Victoria", email: "victoria@gmail.com", password: "victoria")
karmun = User.create(name: "Karmun", email: "karmun@gmail.com", password:"karmun")
tommy = User.create(name: "Tommy", email: "tommy@gmail.com", password: "tommytung")
ida = User.create(name: "Ida", email:"ida@gmail.com", password:"idahosbond")


team1 = Team.create(name: "team 1")
team2 = Team.create(name: "team 2")

team1.users << ingrid
team2.users << ingrid
team1.users << victoria
team1.users << karmun
team2.users << tommy
team2.users << ida

project1 = Project.create(name: "project 1", due_date: (DateTime.now + 1.month).to_s)
project2 = Project.create(name: "project 2", due_date: (DateTime.now + 2.months).to_s)
project3 = Project.create(name: "project 3", due_date: (DateTime.now + 3.months).to_s)
project4 = Project.create(name: "project 4", due_date: (DateTime.now + 4.months).to_s)
project5 = Project.create(name: "project 5", due_date: (DateTime.now + 5.months).to_s)
project6 = Project.create(name: "project 6", due_date: (DateTime.now + 6.months).to_s)

team1.projects << project1
team1.projects << project2
team2.projects << project3
team2.projects << project4
ingrid.projects << project5
ingrid.projects << project6

project1.tasks.create([{name:"task 1"},{name:"task 2"}])
project2.tasks.create([{name:"task 1"},{name:"task 2"}])
project3.tasks.create([{name:"task 1"},{name:"task 2"}])
project4.tasks.create([{name:"task 1"},{name:"task 2"}])
project5.tasks.create([{name:"task 1"},{name:"task 2"}])
project6.tasks.create([{name:"task 1"},{name:"task 2"}])

karmun.projects.create(name:"KARMUN'S PROJECT!!!", due_date: (DateTime.now).to_s)

ingrid.projects.create(name:"due today project", due_date: (DateTime.now).to_s)
ingrid.projects.create(name:"due tomorrow project", due_date: (DateTime.now + 1.day).to_s)
ingrid.projects.create(name:"due within a week project", due_date: (DateTime.now + 1.week).to_s)
ingrid.projects.create(name:"due within 2 weeks project", due_date: (DateTime.now + 2.weeks).to_s)
ingrid.projects.create(name:"due within a month project", due_date: (DateTime.now + 1.month).to_s)
