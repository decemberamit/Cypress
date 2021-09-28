
Feature: NYPE46 Charterparty Tab
    As a Tester
    I want to check and verify Charterparty Tab

    Background:
        Given I create and navigate to Cp
            | templateName | brokerCompanyId | chartererCompanyId | isProforma |
            | NYPE46       | 385             | 281                | false      |


    Scenario: Update datafield values on CPTab for NYPE46
        And I click on Charterparty tab
        # Below step enters date manually not through date picker
        And I Update datafield for NYPE46 with following values
            | cpPlace | cpDate     |
            | London  | 17-08-2021 |
        # Below step can be moved to reusable steps in future (if the validation remains same across all forms)
        Then I verify that datafield values are updated on CPTab for NYPE46


    Scenario: Delete text on NYPE46 CPTab in Draft status
        And I change status of CP to 'Draft'
        # Below step can be made generic (as currently we are using line no 23)
        When I delete some texts on the main clause section on CP tab for NYPE46
        Then the deleted text appears red strikethrough on the Charter party Tab


    Scenario: Delete text on NYPE46 CPTab in Working Copy status
        And I change status of CP to 'Working Copy'
        When I delete some texts on the main clause section on CP tab for NYPE46
        Then the deleted text appears red strikethrough on the Charter party Tab



    Scenario: Delete text on NYPE46 CPTab in Final status
        And I change status of CP to 'Final'
        When I delete some texts on the main clause section on CP tab for NYPE46
        Then the deleted text appears red strikethrough on the Charter party Tab


    Scenario: Reinstate Line on Deleted text on NYPE46 CPTab
        And I delete some texts on the main clause section on CP tab for NYPE46
        When I select Reinstate Line option on deleted text
        Then the deleted text is reinstated back to the base on the Charter party tab



    Scenario: Reinstate Selection on Deleted text on NYPE46 CPTab
        And I delete some texts on the main clause section on CP tab for NYPE46
        When I select Reinstate Selection option on deleted text
        Then the deleted text is reinstated back to the base on the Charter party tab

    Scenario: Insert text on NYPE46 CPTab in Draft status
        And I change status of CP to 'Draft'
        When I insert some texts on the main clause section on CP tab for NYPE46
        Then I see the insertions in green, italic and bold on the Charter party tab


    Scenario: Insert text on NYPE46 CPTab in Working Copy status
        And I change status of CP to 'Working Copy'
        When I insert some texts on the main clause section on CP tab for NYPE46
        Then I see the insertions in green, italic and bold on the Charter party tab


    Scenario: Insert text on NYPE46 CPTab in Final status
        And I change status of CP to 'Final'
        When I insert some texts on the main clause section on CP tab for NYPE46
        Then I see the insertions in green, italic and bold on the Charter party tab

    Scenario: Reinstate Line on Inserted text on NYPE46 CPTab
        And I insert some texts on the main clause section on CP tab for NYPE46
        When I select Reinstate Line option on inserted text
        Then the inserted text is reinstated back to the base on the Charter party tab

    Scenario: Reinstate Selection on Inserted text on NYPE46 CPTab
        And I insert some texts on the main clause section on CP tab for NYPE46
        When I select Reinstate Selection option on inserted text
        Then the inserted text is reinstated back to the base on the Charter party tab

    Scenario: Insert link to datafield on NYPE46 CPTab
        When I insert link to datafield 'Bank details' on CP tab for NYPE46
        Then the inserted datafield is visilble on the Charter party tab


    Scenario Outline: Update value in new inserted datafield on NYPE46 CPTab
        When I insert link to datafield '<fieldname>' on CP tab for NYPE46
        And I update the datafield with following values '<fieldvalue>'
        Then I verify that datafield is updated with '<fieldvalue>' on CPTab for NYPE46
        Examples:
            |fieldname|fieldvalue|
            |Bank details| Bank details Value1|


    Scenario: Remove link to newly Inserted datafield on NYPE46 CPTab
        And I insert link to datafield 'Bank details' on CP tab for NYPE46
        When I remove the link to inserted datafield 'Bank details'
        Then the inserted datafield is removed from NYPE46 CPTab

    Scenario: Selecting Cancel in Datafield  not added in Charter party
        And I click on insert link to datafield 'Bank details' on CP tab for NYPE46
        When I click on cancel datafield
        Then the inserted datafield is not added to NYPE46 CPTab
