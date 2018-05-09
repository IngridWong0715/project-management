class TaskSerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :project_id, :due_date, :complete
  belongs_to :project
end
