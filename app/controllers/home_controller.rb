class HomeController < ApplicationController
  def index
  end

  def ajax
    @user = User.all
      if current_user
      render json: {user: @user, status: :ok}
      else
      render json: {status: :ok, user: :not_logged}
    end
  end

end
