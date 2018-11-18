require "application_system_test_case"

class CurrentsTest < ApplicationSystemTestCase
  setup do
    @current = currents(:one)
  end

  test "visiting the index" do
    visit currents_url
    assert_selector "h1", text: "Currents"
  end

  test "creating a Current" do
    visit currents_url
    click_on "New Current"

    fill_in "Amount", with: @current.amount
    fill_in "App", with: @current.app
    fill_in "Balance", with: @current.balance
    fill_in "Type", with: @current.type
    click_on "Create Current"

    assert_text "Current was successfully created"
    click_on "Back"
  end

  test "updating a Current" do
    visit currents_url
    click_on "Edit", match: :first

    fill_in "Amount", with: @current.amount
    fill_in "App", with: @current.app
    fill_in "Balance", with: @current.balance
    fill_in "Type", with: @current.type
    click_on "Update Current"

    assert_text "Current was successfully updated"
    click_on "Back"
  end

  test "destroying a Current" do
    visit currents_url
    page.accept_confirm do
      click_on "Destroy", match: :first
    end

    assert_text "Current was successfully destroyed"
  end
end
