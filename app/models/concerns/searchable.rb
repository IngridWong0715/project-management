# module Searchable
#
#   extend ActiveSupport::Concern
#
#   included do
#     due_today
#   end
#
#
#
#   def due_today
#       all.each.select do |task|
#         (task.due_date.to_date - Date.today).to_i == 6
#       end
#   end
#
# end
