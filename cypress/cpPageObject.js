/// <reference types="Cypress" />

class AddCp{        
    openAddCpMenu(){
        cy.get('#dropdownMenuButton').click()
    }

    clickCreateCpOption(){
        cy.get('.col-md-2 > .dropdown > .dropdown-menu > [ng-click="vm.createNewCp(false)"]').click()
    }

    clickCreateProformaOption(){
        cy.get('.col-md-2 > .dropdown > .dropdown-menu > [ng-click="vm.createNewCp(true)"]').click()
    }

    enterBrokerCompany(broker){
        cy.get('.company-broker > div > .form-control').type(broker.substring(0, 4))
        cy.get('a > strong').click()
    }

    enterChartererCompany(charterer){
        cy.get('.company-charterer > div > .form-control').type(charterer.substring(0, 4))
        cy.get('a > strong').click()
    }

    selectForm(form){
        cy.get('.row > .form-control').select(form)
    }

    selectTerms(terms){
        cy.get('[ng-if="vm.showCustomTerms"] > .form-control').select(terms)
    }

    closeCreateCpForm(){
        cy.get('.modal-footer > .cpm-button-transparent').click()
    }

    clickCreateCpButton(){
        cy.get('.modal-footer > .cpm-button-blue').click()
    }

    changeCpStatus(cpStatus){
        cy.get('[ng-show-on="cpm"] > :nth-child(1) > :nth-child(1) > .cpm-cp-input').select(cpStatus)
    }

}
export const addCp = new AddCp()
