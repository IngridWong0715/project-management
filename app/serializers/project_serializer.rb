class ProjectSerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :team_id, :user_id, :due_date, :complete
  belongs_to :user # optional
  belongs_to :team #optional
  
  has_many :tasks
end

# WHAT"S THE RETURN TYPE OF DUE_DATE?
