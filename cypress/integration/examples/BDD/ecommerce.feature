Feature: End to end ecommerce validation

    application Regression
    @Regression
    Scenario: Ecommerce products delivery
    Given I open ECommerce Page
    When I add items to Cart
    And Validate the total prices
    Then select the country submit and verify Thankyou

    @Smoke
    Scenario: Filling the form to shop
    Given I open ECommerce Page
    When I fill the form details
    |name   | gender    |
    |Bob    | Male      |
    Then validate the fomrs behaviour
    And select the Shop Page

