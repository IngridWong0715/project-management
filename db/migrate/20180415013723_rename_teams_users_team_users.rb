class RenameTeamsUsersTeamUsers < ActiveRecord::Migration[5.2]
  def change
    rename_table :teams_users, :team_users
  end
end
