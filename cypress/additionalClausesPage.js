/// <reference types="Cypress" />

class AdditionalClause {

    EnterManualAdditionalClauseDetails(title, text) {
        cy.get('.clause-title > .form-control').type(title)
        cy.get('#editor-1').type(text)
    }

    ClickonCreateAdditionalClause() {
        cy.get('.modal-footer > .cpm-button-blue')
            .should('contain.text', 'CREATE')
            .click()
    }

    ClickonCancelAdditionalClause() {
        cy.get('.modal-footer > .cpm-button-transparent')
            .should('contain.text', 'CANCEL')
            .click()
    }

    GetAdditionalClauseHeading(){
        return cy.get(`.add-clause-main-heading`)
    }

    GetAdditionalClauseTitle(){
        return  cy.get('.add-clause-title > .ng-pristine > .cpm-cpcld-container > .cpm-cpcld-inner-container > #view-1 > .ice-ins')
    }

    GetAdditionalClauseDescription(){
        return  cy.get('.add-clause > .ng-pristine > .cpm-cpcld-container > .cpm-cpcld-inner-container > #view-1 > .ice-ins')
    }

    UpdateAdditionalClauseTitle(title){
        this.GetAdditionalClauseTitle()
            .click({force: true})

        cy.get('.add-clause-title > .ng-pristine > .cpm-cpcld-container > .cpm-cpcld-hover-container > cpm-cp-ckeditor-component > #editorx-1 > .ice-ins')
            .type('{movetoend} ' +title)
    }

    UpdateAdditionalClauseDescription(description){
        this.GetAdditionalClauseDescription()
            .click({force: true})

        cy.get('.add-clause > .ng-pristine > .cpm-cpcld-container > .cpm-cpcld-hover-container > cpm-cp-ckeditor-component > #editorx-1 > .ice-ins')
            .type('{movetoend} ' +description)
    }

    DeleteAdditionalClauseTitle(title){
        this.GetAdditionalClauseTitle()
            .click({force: true})

        cy.get('.add-clause-title > .ng-pristine > .cpm-cpcld-container > .cpm-cpcld-hover-container > cpm-cp-ckeditor-component > #editorx-1 > .ice-ins')
            .selectAndDelete(title)

    }

    DeleteAdditionalClauseDescription(description){
        this.GetAdditionalClauseDescription()
            .click({force: true})

        cy.get('.add-clause > .ng-pristine > .cpm-cpcld-container > .cpm-cpcld-hover-container > cpm-cp-ckeditor-component > #editorx-1 > .ice-ins')
            .selectAndDelete(description)

    }
}



export const additionalClause = new AdditionalClause()
