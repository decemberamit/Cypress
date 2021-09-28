/// <reference types="cypress"/>

class Export{        
    exportCp(){        
        cy.intercept('**/cpExport/Export/**').as('cp-export')
        cy.get('#subheader-toolbar-kebab-icon').click()
        cy.contains('Export Charter Party').click()
        cy.wait('@cp-export').its('response.statusCode').should('eq', 200)        
    }
}
export const exprt = new Export()
