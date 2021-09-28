/// <reference types="cypress"/>

class TokenCalls{    
    
    getCloudToken(){
        const url = Cypress.env('cloudAppSettings').cloudNativeAPIBaseURL + "/API/1_4/Security/Login"
        cy.request('POST', url, {"Username":Cypress.env('testUser').testUserUsername,"Password":Cypress.env('testUser').testUserPassword,"ExpiryUtc":null})
        .its('body').then(body => {
        cy.writeFile('cypress/fixtures/token.json', {cloudToken: body.LoginToken})
        })
    }

    getCpmLoginToken(){
        const filename = 'cypress/fixtures/token.json'    
        cy.readFile(filename).then((obj) => {
            const cloudToken = obj.cloudToken
            const url = Cypress.env('cloudAppSettings').getCurrentUserServerUrl + "?token=" + encodeURIComponent(cloudToken)
            cy.request(url).then((response) => {
                const cpmLoginToken = response.headers['renewed-token']
                obj.cpmLoginToken = cpmLoginToken
                cy.writeFile(filename, obj)
            })
        })
    }
}
export const tokenCalls = new TokenCalls()
