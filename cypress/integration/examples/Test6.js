/// <reference types="Cypress"/>

describe('My First Test Suite', function()
{
    it('My First Test Case', function()
    {
        cy.visit(Cypress.env('url') + "AutomationPractice/")

        
       // cy.get('div.mouse-hover-content').invoke('show')
        cy.contains('Top').click({force: true})
        cy.url().should('include', 'top')

        cy.get('#opentab').then(function(el)
        {
            const url = el.prop('href')
            cy.log(url)
            cy.visit(url)
        })

    })
})