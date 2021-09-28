    /// <reference types="Cypress" />
    /// <reference types = "Cypress-iframe"/>

    import 'cypress-iframe';
    import moment from 'moment';
    import { uiTabHeadings } from "../../../apiCalls/uiTabHeadings"
    import {nype46CharterPartyTab} from "../../../page_objects/nype46CharterpartyTab"
    import { Given, When, Then, And } from "cypress-cucumber-preprocessor/steps"

    import { commonMethods } from "../../common/commonMethods"


    And ('I click on Charterparty tab',function()  {

    uiTabHeadings.ClickCPTab()
    })

    Then ('I verify that I am on Charterparty Tab',function() {
    //---- verify  whether on CP Tab----
    cy.get('cp-side-toolbar-component').debug()
    .should('be.visible',true);

    })

    And ('I Update datafield for NYPE46 with following values',(dataTable) =>  {

    dataTable.hashes().forEach(elem => {
    cy.wrap(elem.cpPlace.toLowerCase()).as('cpPlace')
    cy.wrap(elem.cpDate).as('cpDate')
    nype46CharterPartyTab.UpdateCpPlace(elem.cpPlace)
    //cy.wait(1000)
    nype46CharterPartyTab.UpdateCpDate(elem.cpDate)
    })

    })

    Then('I verify that datafield values are updated on CPTab for NYPE46',function()  {
      cy.log(this.cpPlace)
      cy.log(this.cpDate)

      nype46CharterPartyTab.GetCpPlaceValue()
      nype46CharterPartyTab.GetCpDateValue()
      return Promise.all([
               cy.get('@CPPlace').then((cpplace) => {
                   expect(cpplace.toLowerCase()).to.equal(this.cpPlace)
               }),
               cy.get('@CPDate').then((cpdate) => {
                 const actualDateString = moment(cpdate, 'DD, MMMM, YYYY').format('DD-MM-YYYY')
                 const expectedDateString = moment(this.cpDate,'DD MM YYYY').format('DD-MM-YYYY')
                   expect(actualDateString).to.equal(expectedDateString)
               })
            ]);

    })



     When ('I delete some texts on the main clause section on CP tab for NYPE46',() => {

      uiTabHeadings.ClickCPTab()

         nype46CharterPartyTab.GetLineWithText("23",'donkey boiler with sufficient steam')
             .selectAndDelete('donkey', 'one')


     })


    When ('I select Reinstate Line option on deleted text',() => {

        nype46CharterPartyTab.GetLineWithDeletedText()
          .rightclick()
          .SelectReinstateLine()


    })

    When ('I select Reinstate Selection option on deleted text',() => {

          nype46CharterPartyTab.GetLineWithDeletedText()
              .setSelection('donkey', 'one')
          .rightclick()
          .SelectReinstateSelection()

    })

    Then ('the deleted text is reinstated back to the base on the Charter party tab',() => {

        nype46CharterPartyTab.GetLineWithText("23",'donkey boiler with sufficient steam')
            .should('have.css', 'text-decoration', 'none solid rgb(136, 136, 136)')
            .should('have.css', 'color', 'rgb(136, 136, 136)')

    })

    When ('I insert some texts on the main clause section on CP tab for NYPE46',() => {

          uiTabHeadings.ClickCPTab()

              nype46CharterPartyTab.GetLineWithText("23",'donkey boiler with sufficient steam')
                  .selectDeleteAndInsert('donkey', 'winches')


        })


     Then ('I see the insertions in green, italic and bold on the Charter party tab',() => {

         nype46CharterPartyTab.GetLineWithInsertedText()
        .should('have.css', 'font-style', 'italic')
        .should('have.css', 'font-weight', '700')
        .should('have.css', 'color', 'rgb(0, 128, 0)')

     })

    When('I select Reinstate Line option on inserted text',() => {

        nype46CharterPartyTab.GetLineWithInsertedText()
          .rightclick()
          .SelectReinstateLine()
    })



    Then ('the inserted text is reinstated back to the base on the Charter party tab',() => {


        nype46CharterPartyTab.GetLineWithLineNo("23")
            .should('have.css', 'text-decoration', 'none solid rgb(136, 136, 136)')
            .should('have.css', 'color', 'rgb(136, 136, 136)')
          // .should('not.contain.text','Inserted New Text')

    })



    When('I select Reinstate Selection option on inserted text',() => {

        nype46CharterPartyTab.GetLineWithLineNo("23")
            .setSelection('Inserted', 'winches')
            .rightclick()
            .SelectReinstateSelection()

    })

    Then ('the line is reinstated back to the base on the Charter party tab', () => {

        nype46CharterPartyTab.GetLineWithLineNo("23")
            .should('have.css', 'text-decoration', 'none solid rgb(136, 136, 136)')
            .should('have.css', 'color', 'rgb(136, 136, 136)')
            //.should('not.contain.text','Inserted New Text')
    })



    When('I insert link to datafield {string} on CP tab for NYPE46', (datafieldName) => {
        cy.wrap(datafieldName).as('fieldName')
        uiTabHeadings.ClickCPTab()

        nype46CharterPartyTab.GetLineWithLineNo("17")
            .rightclick({force: true})
            .wait(1000)
            .SelectInsertLinkToDatafield()
            .InsertDatafield(datafieldName)

        commonMethods.ClickOnSaveDataField()
    });


    Then ('the inserted datafield is visilble on the Charter party tab', function()  {

        const datafieldname = this.fieldName

            nype46CharterPartyTab.GetLineWithLineNo("17")
                .find('dfplaceholder')
                .invoke('attr', 'empty-display-name')
                .should('eq', datafieldname)
    })


    And ('I update the datafield with following values {string}', function(fieldvalue) {

        const datafieldname = this.fieldName
        nype46CharterPartyTab.GetLineWithLineNo("17")
        .find('dfplaceholder')
        .click({force: true})
        cy.get('.col-md-12 > .multiline-input > textarea').type(fieldvalue)
        commonMethods.ClickOnSaveDataField()

    })



    Then ('I verify that datafield is updated with {string} on CPTab for NYPE46', function (fieldvalue) {
    nype46CharterPartyTab.GetLineWithLineNo("17")
        .find('dfplaceholder')
        .should('contain.text',fieldvalue)
    })



    When ('I remove the link to inserted datafield {string}', function(datafieldName) {
        nype46CharterPartyTab.GetLineWithLineNo("17")
            .find('dfplaceholder')
            .rightclick()
            .SelectRemoveLinkToDatafield()
    })



    Then ('the inserted datafield is removed from NYPE46 CPTab', function() {
        nype46CharterPartyTab.GetLineWithLineNo("17")
            .find('dfplaceholder')
            .should('not.exist')


    })


    When ('I remove the link to existing datafield {string}', function(datafieldName) {

            cy.wrap(datafieldName).as('fieldName')
        uiTabHeadings.ClickCPTab()

            cy.get('[title="'+datafieldName+'"]')
            .rightclick()
            .SelectRemoveLinkToDatafield()
    })


    Then ('the existing datafield {string} is removed from NYPE46 CPTab', function(datafieldName) {

        cy.get('[title="'+datafieldName+'"]')
            .should('not.exist')
    })


    And('I click on insert link to datafield {string} on CP tab for NYPE46', (datafieldName) => {
        cy.wrap(datafieldName).as('fieldName')
        uiTabHeadings.ClickCPTab()

        nype46CharterPartyTab.GetLineWithLineNo("17")
            .rightclick({force: true})
            .wait(1000)
            .SelectInsertLinkToDatafield()
            .InsertDatafield(datafieldName)
    });

    When ('I click on cancel datafield',function() {

        commonMethods.ClickOnCancelDataField()
    })

    Then ('the inserted datafield is not added to NYPE46 CPTab', function() {
        nype46CharterPartyTab.GetLineWithLineNo("17")
            .find('dfplaceholder')
            .should('not.exist')
    })
