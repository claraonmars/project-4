require "application_system_test_case"

class SavingsTest < ApplicationSystemTestCase
  setup do
    @saving = savings(:one)
  end

  test "visiting the index" do
    visit savings_url
    assert_selector "h1", text: "Savings"
  end

  test "creating a Saving" do
    visit savings_url
    click_on "New Saving"

    fill_in "Amount", with: @saving.amount
    fill_in "Balance", with: @saving.balance
    fill_in "Type", with: @saving.type
    click_on "Create Saving"

    assert_text "Saving was successfully created"
    click_on "Back"
  end

  test "updating a Saving" do
    visit savings_url
    click_on "Edit", match: :first

    fill_in "Amount", with: @saving.amount
    fill_in "Balance", with: @saving.balance
    fill_in "Type", with: @saving.type
    click_on "Update Saving"

    assert_text "Saving was successfully updated"
    click_on "Back"
  end

  test "destroying a Saving" do
    visit savings_url
    page.accept_confirm do
      click_on "Destroy", match: :first
    end

    assert_text "Saving was successfully destroyed"
  end
end
