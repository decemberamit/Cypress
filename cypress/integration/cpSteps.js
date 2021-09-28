/// <reference types="Cypress"/>

import {cpCalls} from "../../../apiCalls/cpCalls"
import {addCp} from "../../../page_objects/addCp"
import {cpHeader} from "../../../page_objects/cpHeader"
import {exprt} from "../../../page_objects/export"
import { Given, When, Then, And } from "cypress-cucumber-preprocessor/steps"


 Given ('The user navigates to the landing page', function() {
     const filename = 'cypress/fixtures/token.json'
     cy.readFile(filename).then((obj) => {
         const token = encodeURIComponent(obj.cloudToken)
         cy.visit(Cypress.env('contractLandingPageUrl') + `?token=${token}`)
     })
 })

// And('open charter party tab', ()=> {
//     cy.get('ul > li:nth-child(4) > a > uib-tab-heading').click()   
// })

Then('I validate Cp details on the header section', function () {
    const cpId = this.cpId
    const templateName = this.templateName
    cy.get('#sub-header-record-id').should('contain', cpId).should('contain', templateName.toLowerCase())
})

Given('I navigate to the landing page and intercept Cp search results to {string}', (resultCount) => {
    const filename = 'cypress/fixtures/token.json'
    const cpFile = 'cypress/fixtures/cpSearchResults.json'
    cy.log(resultCount)
    cy.readFile(cpFile).then((obj) => {
        const totalCount = obj.length
        const diff = totalCount-parseInt(resultCount)
        cy.log(diff)
        obj.splice(0, diff)
        cy.writeFile('cypress/fixtures/cpSearchResults1.json', obj)
    })
    cy.intercept('POST', '**/GetCPSearchResults', {fixture:'cpSearchResults1.json'}).as('cpSearchResults')
    cy.readFile(filename).then((obj) => {
        const token = encodeURIComponent(obj.cloudToken)
        cy.visit(Cypress.env('contractLandingPageUrl') + `?token=${token}`)        
    })
    cy.wait('@cpSearchResults')
})

Then('I validate show more button is disabled and displayed as {string}', (buttonText) => {
    if (buttonText == "All listed"){
        cy.get('.show-more > .btn').should('contain', buttonText).should('be.disabled')
    }
    cy.get('.show-more > .btn').should('contain', buttonText)    
})

When('I create CP', (dataTable) => {
    dataTable.hashes().forEach(elem => {
        cy.intercept('**/cp/create/**').as('createCp')
        cy.wrap(elem.templateName).as('templateName')
        cy.wrap(elem.chartererCompany).as('chartererCompany')
        addCp.openAddCpMenu()
        addCp.clickCreateCpOption()
        addCp.enterBrokerCompany(elem.brokerCompany)
        addCp.enterChartererCompany(elem.chartererCompany)
        addCp.selectForm(elem.templateName)
        addCp.clickCreateCpButton()    
        cy.wait('@createCp').its('response.body').then(cpId => {
            cy.log(cpId)
            cy.wrap(cpId).as('cpId')
        })
    })
})

Then('I verify CP details', function () {
    cy.log(this.templateName)
    cy.log(this.chartererCompany)
    cy.log(this.cpId)
    cpHeader.getCpTemplateAndIdFromHeader()
    cpHeader.getChartererFromHeader()
    return Promise.all([
        cy.get('@recId').then((recId1) => {
            expect(recId1).to.equal(this.templateName.toLowerCase() + ' ' + this.cpId)
        }),
        cy.get('@charterer').then((charterer) => {
            expect(charterer).to.equal(this.chartererCompany + ' ')
        })
      ]);
})

When('I export Cp', function (){
    cy.get('@cpId').then((cpId) => {
        cpCalls.exportCp(cpId)
    })
})

And('I export Cp using ui', function () {
    exprt.exportCp()    
})
