class TeamSerializer < ActiveModel::Serializer
  attributes :id, :name, :function, :description
  has_many :projects

end
