/// <reference types="cypress"/>

class NYPE46CharterPartyTab{      

    UpdateCpPlace(cpPlace){
        cy.get('[title="CP Place"]').click({force: true})
        cy.wait(1000)
        cy.get('.col-md-12 > .multiline-input > #cp-place').type(cpPlace)
        cy.get('#cpm-share-button').click()
    }
    
    UpdateCpDate(cpDate){        
        cy.get('[title="CP Date"]').first().click({force: true})
        cy.wait(1000)
        cy.get('.input-group > [type="text"]').first().type(cpDate)
        cy.get('#cpm-share-button').click()

            // Select date through datepicker ---Needs to be implemented
           // cy.get('div.ng-pristine > .input-group > .input-group-btn > .btn > .fa').click();
            
    }



    getDatafieldValue(datafieldName){
        return   cy.get('[title="'+datafieldName+'"]').text()
    }

    GetCpPlaceValue(){
        cy.get('[title="CP Place"]').text().as('CPPlace')
    }
    
    GetCpDateValue(){
        cy.get('[title="CP Date"]').text().as('CPDate');
    }

    GetLineWithText(lineno, text){
      return   cy.get('[line-number="'+ lineno +'"] > td').last()
            .contains(text)
    }

    GetLineWithLineNo(lineno){
        return  cy.get('[line-number="'+ lineno +'"] > td').last()
    }

    GetLineWithDeletedText(){
        return cy.get('.ice-del')
    }

    GetLineWithInsertedText(){
        return cy.get('.ice-ins')
    }
}

export const nype46CharterPartyTab = new NYPE46CharterPartyTab()
