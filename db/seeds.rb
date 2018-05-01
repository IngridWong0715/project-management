ingrid = User.create!(first_name:"Ingrid", email: "ingrid830715@gmail.com", password: "ingridWONG830715")
victoria = User.create!(first_name: "Victoria", email: "victoria@gmail.com", password: "victoria")
karmun = User.create!(first_name: "Karmun", email: "karmun@gmail.com", password:"karmun")
tommy = User.create!(first_name: "Tommy", email: "tommy@gmail.com", password: "tommytung")
ida = User.create!(first_name: "Ida", email:"ida@gmail.com", password:"idahosbond")
testUser = User.create!(first_name: "TEST USER", email:"test@gmail.com", password:"123456")

team1 = Team.create!(name: "team 1", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ultrices ut lectus a tempor. Sed id libero fringilla, lacinia turpis at, vulputate est.")
team2 = Team.create!(name: "team 2", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ultrices ut lectus a tempor. Sed id libero fringilla, lacinia turpis at, vulputate est.")
team3 = Team.create!(name: "team 3", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ultrices ut lectus a tempor. Sed id libero fringilla, lacinia turpis at, vulputate est.")

team1.users << ingrid
team1.users << victoria
team1.users << karmun
team2.users << ingrid
team2.users << tommy
team2.users << ida
team3.users << ingrid
team3.users << tommy

# testing team behaviours
team1_project1 = team1.projects.create!(name: "team1_project1", due_date: (DateTime.now + 1.month).to_s, description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ultrices ut lectus a tempor. Sed id libero fringilla, lacinia turpis at, vulputate est.")
team1_project2 = team1.projects.create!(name: "team1_project2", due_date: (DateTime.now + 2.months).to_s, description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ultrices ut lectus a tempor. Sed id libero fringilla, lacinia turpis at, vulputate est.")
team1_project3 = team1.projects.create!(name: "team1_project3", due_date: (DateTime.now + 3.months).to_s, description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ultrices ut lectus a tempor. Sed id libero fringilla, lacinia turpis at, vulputate est.")
team2_project1 = team2.projects.create!(name: "team2_project1", due_date: (DateTime.now + 4.months).to_s, description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ultrices ut lectus a tempor. Sed id libero fringilla, lacinia turpis at, vulputate est.")
team2_project1 = team2.projects.create!(name: "team2_project2", due_date: (DateTime.now + 5.months).to_s, description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ultrices ut lectus a tempor. Sed id libero fringilla, lacinia turpis at, vulputate est.")
team3_project1 = team3.projects.create!(name: "team3_project1", due_date: (DateTime.now + 6.months).to_s, description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ultrices ut lectus a tempor. Sed id libero fringilla, lacinia turpis at, vulputate est.")

team1_project1_task1 = team1_project1.tasks.create!(name:"team1_project1_task1", due_date: (DateTime.now).to_s, description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ultrices ut lectus a tempor. Sed id libero fringilla, lacinia turpis at, vulputate est.")
team1_project1_task2 = team1_project1.tasks.create!(name:"team1_project1_task2", due_date: (DateTime.now).to_s, description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ultrices ut lectus a tempor. Sed id libero fringilla, lacinia turpis at, vulputate est.")
team1_project1_task3 = team1_project1.tasks.create!(name:"team1_project1_task3", due_date: (DateTime.now).to_s, description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ultrices ut lectus a tempor. Sed id libero fringilla, lacinia turpis at, vulputate est.")
team1_project1_task4 = team1_project1.tasks.create!(name:"team1_project1_task4", due_date: (DateTime.now).to_s, description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ultrices ut lectus a tempor. Sed id libero fringilla, lacinia turpis at, vulputate est.")
team1_project1_task5 = team1_project1.tasks.create!(name:"team1_project1_task5", due_date: (DateTime.now).to_s, description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ultrices ut lectus a tempor. Sed id libero fringilla, lacinia turpis at, vulputate est.")
team1_project1_task6 = team1_project1.tasks.create!(name:"team1_project1_task6", due_date: (DateTime.now).to_s, description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ultrices ut lectus a tempor. Sed id libero fringilla, lacinia turpis at, vulputate est.")

# testing individual behaviours


ingrid_project= ingrid.projects.create!(name:"due today project", due_date: (DateTime.now).to_s, description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ultrices ut lectus a tempor. Sed id libero fringilla, lacinia turpis at, vulputate est.")
ingrid.projects.create!(name:"due tomorrow project", due_date: (DateTime.now + 1.day).to_s, description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ultrices ut lectus a tempor. Sed id libero fringilla, lacinia turpis at, vulputate est.")
ingrid.projects.create!(name:"due within a week project", due_date: (DateTime.now + 1.week).to_s, description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ultrices ut lectus a tempor. Sed id libero fringilla, lacinia turpis at, vulputate est.")
ingrid.projects.create!(name:"due within 2 weeks project", due_date: (DateTime.now + 2.weeks).to_s, description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ultrices ut lectus a tempor. Sed id libero fringilla, lacinia turpis at, vulputate est.")
ingrid.projects.create!(name:"due within a month project", due_date: (DateTime.now + 1.month).to_s, description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ultrices ut lectus a tempor. Sed id libero fringilla, lacinia turpis at, vulputate est.")
ingrid.projects.create!(name:"past due project", due_date: (DateTime.now - 1.day).to_s, description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ultrices ut lectus a tempor. Sed id libero fringilla, lacinia turpis at, vulputate est.")

karmun.projects.create!(name:"KARMUN'S PROJECT!!! SHOULDNT APPEAR ANYWHERE", due_date: (DateTime.now).to_s)

ingrid_project.tasks.create!(name:"task1", due_date: (DateTime.now + 1.week).to_s, description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ultrices ut lectus a tempor. Sed id libero fringilla, lacinia turpis at, vulputate est.")
ingrid_project.tasks.create!(name:"task2", due_date: (DateTime.now + 1.week).to_s, description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ultrices ut lectus a tempor. Sed id libero fringilla, lacinia turpis at, vulputate est.")
ingrid_project.tasks.create!(name:"task3", due_date: (DateTime.now + 1.week).to_s, description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ultrices ut lectus a tempor. Sed id libero fringilla, lacinia turpis at, vulputate est.")
ingrid_project.tasks.create!(name:"task4", due_date: (DateTime.now + 1.week).to_s, description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ultrices ut lectus a tempor. Sed id libero fringilla, lacinia turpis at, vulputate est.")
ingrid_project.tasks.create!(name:"task5", due_date: (DateTime.now + 1.week).to_s)
