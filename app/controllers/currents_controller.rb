class CurrentsController < ApplicationController
  before_action :set_current, only: [:show, :edit, :update, :destroy]
  skip_before_action :verify_authenticity_token

def success
end

  # GET /currents
  # GET /currents.json
  def index
    @current = Current.where(account_id: params[:account_id] )

      respond_to do |format|
        format.html
        format.json { render :json => @current }
  end
end

  # GET /currents/1
  # GET /currents/1.json
  def show
        @latestcurrent = Current.all.last

        respond_to do |format|
        format.html
        format.json { render :json => @latestcurrent }
    end

  end

  # GET /currents/new
  def new
    @current = Current.new
  end

  # GET /currents/1/edit
  def edit
  end

  # POST /currents
  # POST /currents.json
  def create



    @current = Current.new(current_params)

    respond_to do |format|
      if @current.save
        format.html { redirect_to @current, notice: 'Current was successfully created.' }
        format.json { render :show, status: :created, location: @current }
      else
        format.html { render :new }
        format.json { render json: @current.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /currents/1
  # PATCH/PUT /currents/1.json
  def update
    respond_to do |format|
      if @current.update(current_params)
        format.html { redirect_to @current, notice: 'Current was successfully updated.' }
        format.json { render :show, status: :ok, location: @current }
      else
        format.html { render :edit }
        format.json { render json: @current.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /currents/1
  # DELETE /currents/1.json
  def destroy
    @current.destroy
    respond_to do |format|
      format.html { redirect_to currents_url, notice: 'Current was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_current
      @current = Current.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def current_params
      params.require(:current).permit(:amount, :balance, :sort, :operation, :date, :account_id, :created_at, :updated_at)
    end
end
