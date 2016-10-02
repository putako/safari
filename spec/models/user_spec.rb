require 'rails_helper'
require 'support/violate_check_constraint_matcher'

describe User do
	describe "email" do
		let(:user) {
			User.create!(email: "foo@buttcheese.com",
							password: "assholesrus",
							password_confirmation: "assholesrus")
		}
		it "absolutely prevents invalid email addresses" do
			expect {
				user.update_attribute(:email, "foo@bar.com")
			}.to violate_check_constraint(:email_must_be_company_email)
		end
	end
end