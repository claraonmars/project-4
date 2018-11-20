class InvestmentsController < ApplicationController
  before_action :set_investment, only: [:show, :edit, :update, :destroy]
  skip_before_action :verify_authenticity_token

  # GET /accounts
  # GET /accounts.json
  def index
    @accounts = Account.where(user_id: current_user.id)
    @investments = Investment.where(account_id: @accounts.ids)

    respond_to do |format|
        format.html
        format.json { render :json => {:accounts => @accounts,
                                        :investments => @investments } }
    end
  end

  # GET /accounts/1
  # GET /accounts/1.json
  def show

  end

  # GET /accounts/new
  def new
  end

  # GET /accounts/1/edit
  def edit
  end

  # POST /accounts
  # POST /accounts.json
  def create
  end

  # PATCH/PUT /accounts/1
  # PATCH/PUT /accounts/1.json
  def update
    respond_to do |format|
      if @investment.update(investment_params)
        format.html { redirect_to @investment, notice: 'account was successfully updated.' }
        format.json { render :show, status: :ok, location: @investment }
      else
        format.html { render :edit }
        format.json { render json: @investment.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /accounts/1
  # DELETE /accounts/1.json
  def destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_investment
      @investment = Investment.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def investment_params
      params.require(:investment).permit(:rounding, :recurring, :recurring_amount, :oneoff, :account_id)
    end

end
