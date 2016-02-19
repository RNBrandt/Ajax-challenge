class Item < ActiveRecord::Base
  validates :title, presence:true

  def completed
    if (self.complete == false)
      self.complete = true
    else
      self.complete = false
    end
  end

  def time_since_creation
    ((Time.now - created_at) / 3600).round
  end



end
