require "rails_helper.rb"

describe "testing that rspec is configured" do 
	it "should pass" do 
		expect(true).to eq(true)
	end
	it "and can (will) fail this test" do
		expect(false).to eq(true)
	end
end