require 'rails_helper'

feature "angular test" do
	let(:email)		{ "bob@buttcheese.com" }
	let(:password)	{ "password123" }
	before do
		User.create!(email: email,
						password: password,
						password_confirmation: password)
	end

	# tests start here...

	scenario "angular test app is working" do
		visit "/angular_test"
		#login
		fill_in		"Email",	with: "bob@buttcheese.com"
		fill_in 	"Password", with: "password123"
		click_button "Log in"
		#check we're on the right page
		expect(page).to have_content("Name")
		#test the page
		fill_in "name", with: "Bob"
		within "header h1" do
			expect(page).to have_content("WHAAAT UUUUUP Bob")
		end
	end
end