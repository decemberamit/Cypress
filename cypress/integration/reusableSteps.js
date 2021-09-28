/// <reference types="Cypress" />

import { Given, When, Then, And } from "cypress-cucumber-preprocessor/steps"
import { cpCalls } from "../../apiCalls/cpCalls"
import { addCp } from "../../page_objects/addCp"
import {uiTabHeadings} from "../../apiCalls/uiTabHeadings"
import {cpHeader} from "../../page_objects/cpHeader";

Given('I create the Cp', (dataTable) => {

    dataTable.hashes().forEach(elem => {
      cy.wrap(elem.templateName).as('templateName')
      cpCalls.createCp(elem.templateName, elem.brokerCompanyId, elem.chartererCompanyId, elem.isProforma)
    })
})

When ('I navigate to the Cp', function () {   
  const cpId = this.cpId      
  const templateName = this.templateName

  const filename = 'cypress/fixtures/token.json'
  cpCalls.unlockCp()
  cy.readFile(filename).then((obj) => {
      const token = encodeURIComponent(obj.cloudToken)
      cy.visit(Cypress.env('environmentApiBaseUrl') + `/cp/${templateName}/${cpId}/1` + `?token=${token}`)
  })
})


Given('I create and navigate to Cp', (dataTable) => {

    dataTable.hashes().forEach(elem => {
        cy.wrap(elem.templateName).as('templateName')
        cpCalls.createCp(elem.templateName, elem.brokerCompanyId, elem.chartererCompanyId, elem.isProforma)
        cy.get('@cpId').then(cpId => {
            cpCalls.navigateToCp(elem.templateName, cpId)
        });
    })


    And('I change status of CP to {string}', (cpStatus) => {
        cy.wrap(cpStatus).as('cpStatus')
        addCp.changeCpStatus(cpStatus)

    })


    Then('the deleted text appears red strikethrough on the Charter party Tab', () => {

        cy.get('.ice-del').should('have.css', 'text-decoration', 'line-through solid rgb(255, 0, 0)')
        cy.get('.ice-del').should('have.css', 'color', 'rgb(255, 0, 0)')

    })


    And('i click on Additional Clause feature on CP Tab', function () {

        uiTabHeadings.ClickCPTab()
        cpHeader.clickOnAddAdditionalClause()

    })
})
     

