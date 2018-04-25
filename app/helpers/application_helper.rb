module ApplicationHelper
  def formatted_datetime(datetime)
    datetime.strftime("Due %d.%m.%Y, %H:%M")
  end

  def team_projects?(projects)
    projects.first.team 
  end
end
