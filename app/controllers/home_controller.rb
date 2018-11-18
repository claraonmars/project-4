class HomeController < ApplicationController
  def index
  end

  def ajax
    @user = User.all
      if current_user
      render json: {user: @user, loggedin: :true}
      else
      render json: {loggedin: :false}
    end
  end

end
