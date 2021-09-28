/// <reference types="cypress"/>


class CommonMethods{

    getIframe(iframe){
        return cy.get(iframe)
            .its('0.contentDocument.body')
            .should('be.visible')
            .then(cy.wrap);
    }

    InsertDatafield(datafieldName){
        cy.get('.modal-dialog').should('be.visible')
        cy.get('.form-group > :nth-child(1) > .col-md-12 > .form-control').type(datafieldName)
        cy.get('.dropdown-menu > li > a[title="'+datafieldName+'"]')
            .should('be.visible')
            .click()
        cy.get('.checkbox-inline > .ng-pristine')
            .click()
    }

    CancelInsertDatafield(datafieldName){
        cy.get('.modal-dialog').should('be.visible')
        cy.get('.form-group > :nth-child(1) > .col-md-12 > .form-control').type(datafieldName)
        cy.get('.dropdown-menu > li > a[title="'+datafieldName+'"]')
            .should('be.visible')
            .click()
        cy.get('.checkbox-inline > .ng-pristine')
            .click()
    }

    ClickOnSaveDataField(){
        cy.get('#cpm-share-button')
            .should('be.enabled')
            .click({force: true})
    }

    ClickOnCancelDataField(){
        cy.get('.modal-footer > .cpm-button-transparent')
            .should('be.enabled')
            .click({force: true})
    }



}

export const commonMethods = new CommonMethods()
