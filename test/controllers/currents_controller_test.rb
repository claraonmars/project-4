require 'test_helper'

class CurrentsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @current = currents(:one)
  end

  test "should get index" do
    get currents_url
    assert_response :success
  end

  test "should get new" do
    get new_current_url
    assert_response :success
  end

  test "should create current" do
    assert_difference('Current.count') do
      post currents_url, params: { current: { amount: @current.amount, app: @current.app, balance: @current.balance, type: @current.type } }
    end

    assert_redirected_to current_url(Current.last)
  end

  test "should show current" do
    get current_url(@current)
    assert_response :success
  end

  test "should get edit" do
    get edit_current_url(@current)
    assert_response :success
  end

  test "should update current" do
    patch current_url(@current), params: { current: { amount: @current.amount, app: @current.app, balance: @current.balance, type: @current.type } }
    assert_redirected_to current_url(@current)
  end

  test "should destroy current" do
    assert_difference('Current.count', -1) do
      delete current_url(@current)
    end

    assert_redirected_to currents_url
  end
end
