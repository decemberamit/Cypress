Feature: CreateAndNavigateToCp
	As a Tester
	I want to create and navigate to Cp


	Scenario: create and navigate to Cp
		Given I create the Cp
			| templateName | brokerCompanyId | chartererCompanyId | isProforma |
			| NYPE46       | 385             | 281                | false      |
		When I navigate to the Cp
		Then I validate Cp details on the header section


	Scenario: Validate Cp Search results eq 20
		Given I navigate to the landing page and intercept Cp search results to '20'
		Then I validate show more button is disabled and displayed as 'All listed'


	Scenario: Validate Cp Search results more than 20
		Given I navigate to the landing page and intercept Cp search results to '21'
		Then I validate show more button is disabled and displayed as 'Show more'


	Scenario: Validate Cp Search results less than 20
		Given I navigate to the landing page and intercept Cp search results to '19'
		Then I validate show more button is disabled and displayed as 'All listed'


# Create CP using UI - DO NOT DELETE
	Scenario: Create and Verify Cp
		Given The user navigates to the landing page
		When I create CP
			| templateName | brokerCompany 			| chartererCompany									| terms |
			| NYPE46       | Adani Shipping Pte Ltd | Al-Bnan Outstanding Co. For General Trading W.L.L	|       |
		Then I verify CP details
