class AddDueDateToProject < ActiveRecord::Migration[5.2]
  def change
      add_column :projects, :due_date, :datetime
  end
end
