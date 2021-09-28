/// <reference types="Cypress"/>

describe('My First Test Suite', function()
{
    it('My First Test Case', function()
    {
        cy.visit("https://rahulshettyacademy.com/AutomationPractice/")

        cy.get('[name="courses"] td:nth-child(2)').each(($el, index, $list) =>
        {
            const courseText = $el.text()
            if(courseText.includes("Python"))
            {
                cy.get('[name="courses"] td:nth-child(2)').eq(index).next().then(function(price)
                {
                    const priceText = price.text()
                    expect(priceText).to.equal("25")
                })
            }
        })
    })
})