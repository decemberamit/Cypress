/// <reference types="cypress"/>

class CpCalls{    
    
    createCp(templateName, brokerCompanyId, chartererCompanyId, isProforma){
        const url = Cypress.env('formsAppSettings').apiUrl + `/cpm/1_1/cp/Create/${templateName}/${brokerCompanyId}/${chartererCompanyId}/${isProforma}`
        cy.log(url)
        const filename = 'cypress/fixtures/token.json'    
        cy.readFile(filename).then((obj) => {
            const cpmLoginToken = obj.cpmLoginToken
            cy.request({
                url: url,
                headers: {
                'CPM.LoginToken' : cpmLoginToken
                }
            }).its('body').then((body) => {
                const cpId = body
                cy.wrap(cpId).as('cpId')
                
            }) 
        })
        this.unlockCp()
        return this.cpId
    }    

    unlockCp(){
        cy.request(Cypress.env('unlockCp'))
    }
    
    navigateToCp(templateName, cpId){     
          
        const filename = 'cypress/fixtures/token.json'
        cy.readFile(filename).then((obj) => {
            const token = encodeURIComponent(obj.cloudToken)
            cy.visit(Cypress.env('environmentApiBaseUrl') + `/cp/${templateName}/${cpId}/1` + `?token=${token}`)
        })    
    }
    
    exportCp(cpId){
        
        const filename = 'cypress/fixtures/token.json'    
        cy.readFile(filename).then((obj) => {
            const cpmLoginToken = obj.cpmLoginToken
            const url = Cypress.env('formsAppSettings').apiUrl + '/cpm/1_1/cpExport/Export/1/' + cpId + `?token=${encodeURIComponent(cpmLoginToken)}`
            cy.request({
                url: url,
                headers: {
                'CPM.LoginToken' : cpmLoginToken
                },
                encoding: 'binary'
            }).then((response) => {
                cy.writeFile('cypress/fixtures/exportedCp/' + 'Export-' + cpId + '-' +'.pdf', response.body, 'binary')
            })
        }) 
    } 
}


export const cpCalls = new CpCalls()
