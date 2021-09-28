/// <reference types="Cypress"/>
import HomePage from '../../support/pageObjects/HomePage'
import ProductPage from '../../support/pageObjects/ProductPage'

describe("My first test framework suite", function()
{
    before(function()
    {
        cy.fixture('example').then(function(data)
        {
            this.data = data
        })
    })

    it("my first test case in framework", function()
    {
        const homePage = new HomePage()
        const productPage = new ProductPage()

        cy.visit("https://rahulshettyacademy.com/angularpractice/")

        homePage.getName().type(this.data.name)
        homePage.getGender().select(this.data.gender)
        homePage.getName().should('have.value', this.data.name)
        homePage.getTwoWayName().should('have.attr', 'minlength', 2)
        homePage.getEntrepreneur().should('be.disabled')
        homePage.getShopTab().click()

        this.data.productName.forEach(function(element) {
            cy.selectProduct(element)
        });

        productPage.getCheckOutBtn().click()

        var sum = 0

        cy.get('tr td:nth-child(4) strong').each(($el, index, $list) => {

           const amount = $el.text()
           var result = amount.split(" ")
           result = result[1].trim
           sum = Number(sum) + Number(result)  

        }).then(function(amount){            
            cy.log(amount)
            cy.log(sum)
        })

        cy.get('h3 strong').then(function(element)
        {
            const amount = element.text()
            var res = amount.split(" ")
            var total = res[1].trim
            expect(Number(total)).to.equal(sum)
        })
        productPage.finalCheckout().click()
        productPage.getCountryInputField().type('India')
        productPage.getCountrySugesstion().click()
        productPage.getCheckbox().click({force: true})
        productPage.getSubmitBtn().click()
        productPage.getAlert().then(function(element)
        {
            const actualText = element.text()
            expect(actualText.includes("Success")).to.be.true
        }) 
    })
})