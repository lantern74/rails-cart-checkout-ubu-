class CreateDomains < ActiveRecord::Migration[7.1]
  def change
    create_table :domains do |t|
      t.string :name
      t.boolean :verified
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
        add_index :domains, [:name, :user_id], unique: true

  # and domains

   create_join_table :funnels, :domains, table_name: :funnel_domains do |t|
      t.index [:funnel_id, :domain_id]
      t.index [:domain_id, :funnel_id], unique: true
    end


  end

end
