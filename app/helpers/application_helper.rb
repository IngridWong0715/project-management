module ApplicationHelper
  def formatted_datetime(datetime)
    datetime.strftime("Due %d.%m.%Y, %H:%M") 
  end
end
